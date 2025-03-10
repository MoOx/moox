import * as React from "react";

interface PortalContextType {
  portals: { key: string; element: React.ReactNode }[];
  addPortal: (key: string, element: React.ReactNode) => void;
  removePortal: (key: string) => void;
}

const PortalContext = React.createContext<PortalContextType | undefined>(
  undefined,
);

export const PortalProvider = ({ children }: { children: React.ReactNode }) => {
  const [portals, setPortals] = React.useState<
    { key: string; element: React.ReactNode }[]
  >([]);

  const addPortal = React.useCallback(
    (key: string, element: React.ReactNode) => {
      setPortals((prevPortals) => [...prevPortals, { key, element }]);
    },
    [],
  );

  const removePortal = React.useCallback((key: string) => {
    setPortals((prevPortals) =>
      prevPortals.filter((portal) => portal.key !== key),
    );
  }, []);

  return (
    <PortalContext.Provider value={{ portals, addPortal, removePortal }}>
      {children}
      {portals.map(({ key, element }) => (
        <React.Fragment key={key}>{element}</React.Fragment>
      ))}
    </PortalContext.Provider>
  );
};

export const usePortal = (): PortalContextType => {
  const context = React.useContext(PortalContext);
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
  children: React.ReactNode;
}) => {
  const { addPortal, removePortal } = usePortal();

  React.useEffect(() => {
    addPortal(id, children);
    return () => removePortal(id);
  }, [id, children, addPortal, removePortal]);

  return null;
};
