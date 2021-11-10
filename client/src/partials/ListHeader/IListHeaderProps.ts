export default interface IListHeaderProps {
    onFilter?: (query: string) => void;
    onAdd?: () => void;
    title: string;
    placeholder?: string;
    buttonText?: string;
    description: string;
}