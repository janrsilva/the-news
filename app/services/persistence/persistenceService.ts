import { LocalPersistenceService } from "./localPersistenceService";
import { IPersistence } from "./persistence.interface";

export class PersistenceFactory {
    static createPersistenceService(): IPersistence {
        /**
         * for now, we only have one implementation of the IPersistence interface
         * but in the future, we might have more implementations
         * so we use a factory to create the correct implementation
         */
        return new LocalPersistenceService();
    }
}
