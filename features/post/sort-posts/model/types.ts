export type SortType = "NEW" | "TOP"

export interface Props {
	handleSortChange: (value: SortType) => void;
}