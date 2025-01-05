import iconMap from '../../utils/iconMap';
import {
    CardWrapper,
    CardTitle,
    CardList,
    CardListItem,
    CardImage,
    Overlay,
} from './styles';

interface CountryCardProps {
    countryName: string;
    countryData: {
        termo_pt: string;
        index: number;
    }[];
    onClose: () => void; // Função para fechar o card
}

const CountryCard = ({ countryName, countryData, onClose }: CountryCardProps) => {
    if (!countryData || countryData.length === 0) {
        return (
            <>
                <Overlay onClick={onClose} />
                <CardWrapper>
                    <CardTitle>Dados não encontrados para {countryName}</CardTitle>
                </CardWrapper>
            </>
        );
    }

    return (
        <>
            <Overlay onClick={onClose} />
            <CardWrapper>
                <CardTitle>{countryName}</CardTitle>
                <CardList>
                    {countryData.map((item, idx) => (
                        <CardListItem key={idx}>
                            <CardImage
                                src={iconMap[item.termo_pt]} // Fallback para ícone padrão
                                alt={item.termo_pt}
                            />
                            <b>{item.termo_pt}</b>: {item.index}
                        </CardListItem>
                    ))}
                </CardList>
            </CardWrapper>
        </>
    );
};

export default CountryCard;


