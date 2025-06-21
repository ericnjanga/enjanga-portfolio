import { subscribe } from 'diagnostics_channel';
import styles from './_banner.module.scss';
import clsx from 'clsx';
import { Grid, Column } from '@carbon/react';

interface BannerProps {
  title: string;
  subtitle?: string;
}

const Banner = ({ title, subtitle }: BannerProps) => {
  return (
    <header className={clsx(styles.banner, 'banner')}>
      <Grid fullWidth>
        <Column lg={8} md={6} sm={4}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </Column>
      </Grid>
    </header>
  );
};

export default Banner;
