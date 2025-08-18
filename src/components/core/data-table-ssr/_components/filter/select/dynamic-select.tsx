import type {
  ITableFilterOptionSSR,
  ITableFilterOptionSSRSelectDynamic,
} from '@/types';

import useTQuery from '@/hooks/useTQuery';

import type { IFormSelectOption } from '@/components/core/form/types';
import ReactSelectAsync from '@/components/ui/react-select/react-select-async';
import useTableFilter from '@/hooks/useTableFilter';

function DynamicSelect<T>({
  accessor,
  label,
  isPin,
  apiUrl,
}: ITableFilterOptionSSR<T> &
  ITableFilterOptionSSRSelectDynamic & { isPin?: boolean }) {
  const { addFilter, filters } = useTableFilter();

  const { data } = useTQuery<IFormSelectOption[]>({
    queryKey: [label, accessor.toString()],
    url: apiUrl,
  });

  const promiseOptions = (inputValue: string) => {
    return new Promise<IFormSelectOption[]>((resolve) => {
      resolve(
        data?.filter((option) =>
          option.label
            .toString()
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        ) || []
      );
    });
  };

  return (
    <ReactSelectAsync
      menuPortalTarget={isPin ? document.body : undefined}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 999999999999999 }) }}
      name={label}
      id={label}
      onChange={(option: any) => {
        addFilter(accessor as string, option?.value as string);
      }}
      value={
        (data?.find(
          (option) =>
            option.value ===
            filters?.find((filter) => filter.name === accessor)?.value
        ) as any) || null
      }
      cacheOptions
      loadOptions={promiseOptions}
      defaultOptions={data?.slice(0, 10) as any}
    />
  );
}

export default DynamicSelect;
