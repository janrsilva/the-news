import { LocalStorageService } from "./localStorageService";
import { IPersistence } from "./persistenceInterface";

export class PersistenceFactory {
    static createPersistenceService(): IPersistence {
        /**
         * for now, we only have one implementation of the IPersistence interface
         * but is possible to have more than one implementation
         * so we use a factory to create the correct implementation
         */
        return new LocalStorageService();
    }
}
