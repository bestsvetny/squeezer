import { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T } ? S & { use: { [K in keyof T]: () => T[K] } } : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
    const store = _store as WithSelectors<typeof _store>;
    store.use = {};
    for (const k of Object.keys(store.getState())) {
        // eslint-disable-next-line
        (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
    }

    return store;
};

export interface Entities<T> {
    ids: Array<string>;
    entities: Record<string, T>;
}

export const denormalize = <T>(entities: Entities<T>) => {
    const ids = entities.ids;
    return ids.reduce<Array<T>>((acc, curr) => {
        const entity = entities.entities[curr];
        if (entity) {
            return [...acc, entity];
        }
        return acc;
    }, []);
};
