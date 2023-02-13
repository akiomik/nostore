import Alpine from 'alpinejs';
import { sortByIndex } from './db';

Alpine.data('eventLog', () => ({
    events: [],
    view: 'created_at',
    max: 100,
    sort: 'asc',

    // date view
    fromCreatedAt: '2008-10-31',
    toCreatedAt: new Date().toISOString().split('T')[0],

    // kind view
    fromKind: 0,
    toKind: 50000,

    async init() {
        await this.reload();
    },

    async reload() {
        let events = await sortByIndex(
            this.view,
            this.keyRange,
            this.sort === 'asc',
            this.max
        );
        this.events = events;
    },

    get fromTime() {
        let dt = new Date(this.fromCreatedAt);
        return Math.floor(dt.getTime() / 1000);
    },

    get toTime() {
        let dt = new Date(this.toCreatedAt);
        return Math.floor(dt.getTime() / 1000);
    },

    get keyRange() {
        switch (this.view) {
            case 'created_at':
                return IDBKeyRange.bound(this.fromTime, this.toTime);

            case 'kind':
                return IDBKeyRange.bound(this.fromKind, this.toKind);

            default:
                return null;
        }
    },
}));

Alpine.start();
