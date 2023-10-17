import { useParams } from 'react-router-dom';
import { useGetHero } from '../../hooks/heroes/useGetHero';
import ErrorWrapper from '../error-wrapper/ErrorWrapper';
import HeroForm from './HeroForm';
import './heroes-detail.css';

function HeroDetail() {
	const { id } = useParams();
	// const { updateHero, isLoading: isUpdating } = useUpdateHero();
	const {
		isLoading: isGettingHero,
		error: getError,
		hero,
	} = useGetHero(Number(id));
	// const [newName, setNewName] = useState<string>('');
	// const navigate = useNavigate();

	// const goBack = () => navigate(-1);

	// const updateHeroName: ChangeEventHandler<HTMLInputElement> = (event) => {
	// 	setNewName(event.target.value);
	// };

	// const saveHero = async () => {
	// 	await updateHero({
	// 		id: Number(id),
	// 		name: newName,
	// 	});
	// 	goBack();
	// };

	// useEffect(() => {
	// 	if (isUpdating) {
	// 		return;
	// 	}
	// 	setNewName(hero().name);
	// }, [isUpdating]);

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
