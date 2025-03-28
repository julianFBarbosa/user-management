import { CreateUserDTO } from "@/api/entities/userEntity";
import { validateOrReject } from "class-validator";
import type { NextFunction, Request, Response } from "express";

export default async function validateUserRegistration(req: Request, res: Response, next: NextFunction) {
	try {
		if (!req.body) {
			return res.status(400).send({ message: 'Missing request body!' });
		}

		const user = new CreateUserDTO();
		user.name = req.body.name;
		user.document = req.body.document;
		user.email = req.body.email;
		user.password = req.body.password;
		user.age = req.body.age;

		await validateOrReject(user);

		next();
	} catch (e) {
		if (Array.isArray(e) && e[0]?.constraints) {
			const message = Object.values(e[0].constraints)[0];
			res.status(400).send({ message });
		} else {
			res.status(400).send({ message: 'Validation error occurred' });
		}
	}
};
