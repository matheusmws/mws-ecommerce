import { User } from '../models/User';
import { Log } from '../models/Log';

declare global {
    namespace Express {
        interface Request {
            user?: User;
            log?: Log;
        }
    }
}