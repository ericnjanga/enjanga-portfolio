import styles from './_brandName.module.scss';
import clsx from 'clsx';

const BrandName = () => {
  const mockData = {
    brandName: '## Brand Name **',
  };

  return (
    <span className={clsx(styles.brandName, 'brand-name')}>
      {mockData.brandName}
    </span>
  );
};

export default BrandName;
