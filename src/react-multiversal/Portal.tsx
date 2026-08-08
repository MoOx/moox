import {
  createContext,
  Fragment,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface PortalContextType {
  portals: { key: string; element: ReactNode }[];
  addPortal: (key: string, element: ReactNode) => void;
  removePortal: (key: string) => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [portals, setPortals] = useState<{ key: string; element: ReactNode }[]>([]);

  const addPortal = useCallback((key: string, element: ReactNode) => {
    setPortals((prevPortals) =>
      prevPortals.some((portal) => portal.key === key)
        ? // Replaced where it already sits, never moved to the end. A portal
          // that changes position in this list is a DOM node React has to
          // move, and moving a node detaches it: every transition running on
          // it is cancelled, and the value it was heading for becomes its
          // starting value - so an animating panel snaps to its end state.
          prevPortals.map((portal) => (portal.key === key ? { key, element } : portal))
        : [...prevPortals, { key, element }],
    );
  }, []);

  const removePortal = useCallback((key: string) => {
    setPortals((prevPortals) => prevPortals.filter((portal) => portal.key !== key));
  }, []);

  return (
    <PortalContext.Provider value={{ portals, addPortal, removePortal }}>
      {children}
      {portals.map(({ key, element }) => (
        <Fragment key={key}>{element}</Fragment>
      ))}
    </PortalContext.Provider>
  );
};

export const usePortal = (): PortalContextType => {
  const context = useContext(PortalContext);
  if (context === undefined) {
    throw new Error("usePortal must be used within a PortalProvider");
  }
  return context;
};

export const Portal = ({ id, children }: { id: string; children: ReactNode }) => {
  const { addPortal, removePortal } = usePortal();

  // The content is refreshed on every render, but the entry is only taken out
  // when this portal really goes away. Doing both in one effect - registering,
  // and unregistering from its cleanup - removes and re-appends the entry on
  // every single render, which reorders the portals and makes React move the
  // DOM nodes. See `addPortal` for what a moved node costs.
  useEffect(() => {
    addPortal(id, children);
  }, [id, children, addPortal]);

  useEffect(() => () => removePortal(id), [id, removePortal]);

  return null;
};
