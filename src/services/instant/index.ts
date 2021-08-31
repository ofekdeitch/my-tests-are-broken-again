import { InstantService } from './glossary';

export class InstantServiceImpl implements InstantService {

    now(): Date {
        return new Date();
    }

}