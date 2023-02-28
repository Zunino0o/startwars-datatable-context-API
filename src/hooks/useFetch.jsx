import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    fetch(url)
      .then((result) => result.json())
      .then((filt) => filt.results)
      .then((planets) => planets
        .map((planet) => Object.keys(planet)
          .filter((key) => key !== 'residents').reduce((obj, key) => {
            obj[key] = planet[key];
            return obj;
          }, {})))
      .then((dat) => setData(dat))
      .catch((err) => setError(err))
      .finally(setLoading(false));
  };

  useEffect(() => {
    refresh();
  }, []);

  return { loading, error, data };
}
