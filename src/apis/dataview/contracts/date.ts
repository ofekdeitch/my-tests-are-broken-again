export type RawDate = string; // ISO date

export function toDate(value: RawDate): Date {
    return new Date(value);
}
