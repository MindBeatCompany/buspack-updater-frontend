// Styles
import classes from './Card.module.css';

const Card = ({
  children,
  flexDirection,
  flexWrap = 'nowrap',
  justifyContent = 'flex-start',
  alignItems = 'stretch',
  alignContent = 'normal',
  gap = 3,
  margin = 5,
  padding = 5,
  width = '90%',
  height = 'fit-content',
  ...props
}) => {
  const cardStyles = {
    flexDirection,
    flexWrap,
    justifyContent,
    alignItems,
    alignContent,
    gap: `var(--spacing-${gap})`,
    margin: `var(--spacing-${margin})`,
    padding: `var(--spacing-${padding})`,
    width,
    height,
    ...props,
  };
  return (
    <article className={classes['card']} style={cardStyles}>
      {children}
    </article>
  );
};
export default Card;
