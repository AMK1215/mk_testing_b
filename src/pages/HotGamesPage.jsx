import React from 'react';
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';
import launchGame from '../hooks/launchGame';
import { Spinner } from 'react-bootstrap';
import GameTabsHeading from '../components/GameTabsHeading';
import { Link, useSearchParams } from 'react-router-dom';

const HotGamesPage = () => {
  const { data: hotGames, loading } = useFetch(`${BASE_URL}/hot_games`);
  const provider = useSearchParams()[0].get('provider');

  let hotLists = hotGames?.find((item) => item.id == provider)?.hot_lists;

  return (
    <div className="px-2 px-sm-3 px-md-4 pb-5">
      {!hotLists && (
        <>
          <GameTabsHeading />
          {loading && <Spinner className="mt-4" />}
          {!loading && hotGames?.length == 0 && (
            <p className="text-center mt-4">No hot games available.</p>
          )}
          <div className="row mt-4">
            {hotGames &&
              hotGames.map((item, index) => (
                <Link
                  to={'/hotGames?provider=' + item.id}
                  key={index}
                  className="col-4 col-md-3 col-lg-2 px-2 mb-4 cursor-pointer"
                >
                  <img className="img-fluid" src={item.imgUrl} alt={item.name} />
                  <button className="d-none d-sm-block gameName fw-semibold mt-2">
                    {item.provider_name}
                  </button>
                  <button className="d-sm-none gameName fw-semibold mt-2">
                    {item.provider_name.length > 10 ? `${item.provider_name.substr(0, 10)}...` : item.name}
                  </button>
                </Link>
              ))}
          </div>
        </>
      )}
      {hotLists && (
        <>
          <GameTabsHeading />
          {loading && <Spinner className="mt-4" />}
          {!loading && hotLists?.length == 0 && (
            <p className="text-center mt-4">No hot games available.</p>
          )}
          <div className="row mt-4">
            {hotLists &&
              hotLists.map((item, index) => (
                <div
                  onClick={launchGame(item.code)}
                  key={index}
                  className="col-4 col-md-3 col-lg-2 px-2 mb-4 cursor-pointer"
                >
                  <img className="img-fluid" src={item.image} alt={item.name} />
                  <button className="d-none d-sm-block gameName fw-semibold mt-2">
                    {item.name}
                  </button>
                  <button className="d-sm-none gameName fw-semibold mt-2">
                    {item.name.length > 10 ? `${item.name.substr(0, 10)}...` : item.name}
                  </button>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HotGamesPage;
