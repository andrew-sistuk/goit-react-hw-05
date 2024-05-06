import css from './ViewButton.module.css';

const ViewButton = ({ handleSeeAll }) => {
  return (
    <button className={css['view-button']} type="button" onClick={handleSeeAll}>
      View All
    </button>
  );
};

export default ViewButton;
