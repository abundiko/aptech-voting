import { Select } from "@radix-ui/themes";

export type AppSelectProps = {
  value?: string;
  name: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  title?: string;
  items?: string[];
};

export default function AppSelect({
  value,
  onChange,
  placeholder,
  title,
  items,
  name
}: AppSelectProps) {
  return (
    <Select.Root onValueChange={onChange} defaultValue={value} name={name}>
      <Select.Trigger
        className="w-full"
        variant="ghost"
        placeholder={placeholder}
      />
      <Select.Content>
        <Select.Group>
          <Select.Label>
            {title}
          </Select.Label>
          {items &&
            items.map(item =>
              <Select.Item value={item} key={item}>
                {item}
              </Select.Item>
            )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
