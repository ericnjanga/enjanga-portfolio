
/**
 * Generates layout styles based on the specified layout type.
 * Layouts inspired from: https://1linelayouts.com/
 */

type LayoutType = {
  type?: 'RAM' | 'list';
  itemMaxWidth?: number; // Maximum width for each item tile
  gridGap?: number; // Gap between grid items in pixels
};

export const enjGetLayout = ({ type = 'RAM', itemMaxWidth = 430, gridGap = 1.5 }: LayoutType) => {

  let layoutStyle = {};
  
  /**
   * Responsive Auto-fitting Masonry (RAM) Layout
   * Creates a grid layout that automatically fits items into the available space,
   * adjusting the number of columns based on the container's width.
   * --------
   * Note: 07. RAM layout is inspired by https://1linelayouts.com/
   */
  const layoutRAM = {
    display: 'grid',
    gap: `${gridGap}rem`,
    gridTemplateColumns: `repeat(auto-fit, minmax(${itemMaxWidth}px, 1fr))`,
  };

  switch (type) {
    case 'RAM':
      layoutStyle = layoutRAM;
      break;

    default:
      layoutStyle = layoutRAM;
  }


  return layoutStyle;
};