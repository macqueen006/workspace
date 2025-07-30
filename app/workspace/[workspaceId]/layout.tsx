import { Toolbar } from "./toolbar";

interface WorkspaceIdLayoutProps { 
    children?: React.ReactNode;
}

const WorkspaceIdLayout = ({children}: WorkspaceIdLayoutProps) => {
    return (
        <div className="h-full">
            <Toolbar />
            <h2>Starter</h2>
            {children}
        </div>
     ); 
}
 
export default WorkspaceIdLayout;