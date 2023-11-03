import { ReactNode } from 'react';

type ItemListProps<T> = {
	items: T[];
	className?: string;
	emptyElement?: () => ReactNode;
	builder: (items: T) => ReactNode;
	keyGenerator?: (item: T) => string | number;
};

function UnorderedItemList<T>({
	items,
	className,
	emptyElement,
	builder,
	keyGenerator = (_) => crypto.randomUUID(),
}: ItemListProps<T>) {
	if (items.length === 0) {
		return emptyElement ? emptyElement() : <></>;
	}

	return (
		<ul className={className ?? ''}>
			{items.map((item) => (
				<li key={keyGenerator(item)}>{builder(item)}</li>
			))}
		</ul>
	);
}

export default UnorderedItemList;
