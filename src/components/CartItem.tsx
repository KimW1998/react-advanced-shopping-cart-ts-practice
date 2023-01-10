import { Button, Stack } from 'react-bootstrap';

import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

type CartItemProps = {
  id: number;
  queantity: number;
};

export function CartItem({ id, queantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        alt={item.name}
        src={item.imgUrl}
        style={{ width: '125px', height: '75px', objectFit: 'cover' }}
      />
      <div className="me-auto">
        <div>
          {item.name}{' '}
          {queantity > 1 && (
            <span className="text-muted" style={{ fontSize: '.65rem' }}>
              x{queantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: '.75rem' }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * queantity)}</div>
      <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(item.id)}>
        &times;
      </Button>
    </Stack>
  );
}
