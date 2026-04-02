import { defineStore } from 'pinia'
import { VisualMode } from '~/types/enums'

export const useModeStore = defineStore('mode', {

    state: () => ({

        _mode: VisualMode.GRID

    }),

    actions: {

        setMode(mode: VisualMode) {
            this._mode = mode;
        },

    },

    getters: {

        mode(): VisualMode {
            return this._mode;
        }

    }



});