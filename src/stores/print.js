import { defineStore } from "pinia";
import axios from "@/axios";

export const usePrintStore = defineStore("print", {
    state: () => ({
        print: false,
    }),
    actions: {
        setPrint(value) {
        this.print = value;
        },
    },

})