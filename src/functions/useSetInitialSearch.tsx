import { useStoreContext } from 'Components/StoreContext'
import { useEffect } from 'react'
import { useCityParam } from './useParam'

export default function useSetInitialSearch() {
  const {
    searchInput: [searchInput, setSearchInput],
    searchFuse: [searchFuse],
  } = useStoreContext()
  const city = useCityParam()

  useEffect(() => {
    if (searchInput != null || city == null || searchFuse == null) return
    setSearchInput({
      inputValue: city ? city.city : '',
      dropdownData: city
        ? searchFuse
            .search(city.city)
            .slice(0, 5)
            .map((r) => r.item)
        : [],
    })
  }, [searchFuse, city])
}
