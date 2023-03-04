import IDatabase from "./IDatabase";
import IRouter from "./IRouter";

export default interface IServer {
	AddRouter: (router: IRouter) => void;
	AddDatabase: (database: IDatabase) => void;
	Listen: () => void;
}
