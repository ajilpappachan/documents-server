import { Router } from "express";

export default interface IRouter {
	BaseUrl: string;
	Router: Router;
	Initialize: () => void;
}
