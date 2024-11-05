import { Switch, rem } from "@mantine/core";
import { IconSunFilled, IconMoonFilled } from "@tabler/icons-react";
import useThemeStore from "../hooks/useThemeStore";

export default function DarkModeToggle() {
  const { themeMode, setThemeMode } = useThemeStore((state) => state);

  const onChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const themeValue = e.target.checked ? "dark" : "light";
    setThemeMode(themeValue);
  };

  const sunIcon = (
    <IconSunFilled
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color="yellow"
    />
  );

  const moonIcon = (
    <IconMoonFilled
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color="gray"
    />
  );

  return (
    <Switch
      size="md"
      onLabel={sunIcon}
      offLabel={moonIcon}
      onChange={(e) => onChangeHandle(e)}
      checked={themeMode == "dark" ? true : false}
    />
  );
}
