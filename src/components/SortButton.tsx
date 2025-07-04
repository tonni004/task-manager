import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import './SortButton.scss';

interface SortButtonProps {
  onSort: (sort: string) => void;
}

export const SortButton = ({ onSort }: SortButtonProps) => {
  return (
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button
          variant="ghost"
          className='SortButton'
          radius='sm'
        >
          Sort by date
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Sort by date"
        onAction={(key) => {
          if (key === "new") {
            onSort('new');
          } else if (key === "old") {
            onSort('old');
          }
        }}
      >
        <DropdownItem key="new">Newest First</DropdownItem>
        <DropdownItem key="old">Oldest First</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
