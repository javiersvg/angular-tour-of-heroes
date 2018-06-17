import { HalElement } from "./hal.element";

export class HalCollection<T extends HalElement> extends HalElement {
    _embedded: {}
}