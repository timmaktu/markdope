export interface StatItem {
	label: string;
	value: string | number;
	helper?: string;
}

export interface StatsData {
	title?: string;
	items: StatItem[];
}

export const statsDefaults: StatsData = {
	title: "Launch metrics",
	items: [
		{
			label: "Blocks rendered",
			value: 7,
			helper: "Official components in this starter pack."
		},
		{
			label: "Editable components",
			value: 1,
			helper: "The toggle proves write-back from rendered UI."
		},
		{
			label: "Fence languages",
			value: "2+",
			helper: "Configurable in plugin settings."
		}
	]
};
