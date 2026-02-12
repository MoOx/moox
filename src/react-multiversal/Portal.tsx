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
  const [portals, setPortals] = useState<{ key: string; element: ReactNode }[]>(
    [],
  );

  const addPortal = useCallback((key: string, element: ReactNode) => {
    setPortals((prevPortals) => [...prevPortals, { key, element }]);
  }, []);

  const removePortal = useCallback((key: string) => {
    setPortals((prevPortals) =>
      prevPortals.filter((portal) => portal.key !== key),
    );
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

export const Portal = ({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) => {
  const { addPortal, removePortal } = usePortal();

  useEffect(() => {
    addPortal(id, children);
    return () => removePortal(id);
  }, [id, children, addPortal, removePortal]);

  return null;
};
