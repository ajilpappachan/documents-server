import IRouter from "./IRouter";

export default interface IServer {
	AddRouter: (router: IRouter) => void;
	Listen: () => void;
}
