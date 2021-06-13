export interface ITsubasaEvent {
    get trigger(): string;

    run(...args: any[]): Promise<any>;
}