import { Request, Response, NextFunction } from 'express';
import Log from '../models/Log';

export const requestLogger = async (req: Request, res: Response, next: NextFunction) => {
    const logData = {
        ip: req.ip,
        datetime: new Date(),
        endpoint: req.originalUrl,
        requestType: req.method,
        authorization: req.headers['authorization'],
        params: req.params,
        body: req.body,
        statusCode: 0
    };

    // Salvar log da requisição (sem o statusCode e stackTrace ainda)
    const log = new Log(logData);
    await log.save();

    // Guardar o log no objeto da requisição para ser usado mais tarde no response
    req.log = log;

    next();
};

export const responseLogger = async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        if (req.log) {
            req.log.stackTrace = err.stack;
            req.log.statusCode = 500;
            await req.log.save();
        }

        // Passando o erro para o próximo middleware (gerenciador de erros)
        return next(err);
    }

    // Caso contrário, registrar o statusCode da resposta
    if (req.log) {
        req.log.statusCode = res.statusCode;
        await req.log.save();
    }

    next();
};