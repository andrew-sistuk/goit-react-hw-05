import css from './ViewButton.module.css';

export const ViewButton = ({ handleSeeAll }) => {
  return (
    <button className={css['view-button']} type="button" onClick={handleSeeAll}>
      View All
    </button>
  );
};