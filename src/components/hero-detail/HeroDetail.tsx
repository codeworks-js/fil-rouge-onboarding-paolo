import { useParams } from 'react-router-dom';
import { useGetHero } from '../../hooks/heroes/useGetHero';
import ErrorWrapper from '../error-wrapper/ErrorWrapper';
import HeroForm from './HeroForm';
import './heroes-detail.css';

function HeroDetail() {
	const { id } = useParams();
	const {
		isLoading: isGettingHero,
		error: getError,
		hero,
	} = useGetHero(Number(id));

	return (
		<ErrorWrapper error={getError()}>
			{isGettingHero() ? (
				<div>Loading... </div>
			) : (
				<HeroForm initiaHero={hero()} />
			)}
		</ErrorWrapper>
	);
}

export default HeroDetail;
