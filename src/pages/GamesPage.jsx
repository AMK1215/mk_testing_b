import React, { useCallback, useEffect, useState } from 'react'
import GameTabsHeading from '../components/GameTabsHeading'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import p1 from '../assets/images/pg1.png'
import p2 from '../assets/images/pg2.png'
import p3 from '../assets/images/pg3.png'
import p4 from '../assets/images/pg4.png'
import p5 from '../assets/images/pg5.png'
import p6 from '../assets/images/pg6.png'
import p8 from '../assets/images/pg8.png'
import sg1 from '../assets/images/sg1.png'
import sg2 from '../assets/images/sg2.png'
import ng1 from '../assets/images/ng1.png'
import ng2 from '../assets/images/ng2.png'
import ng3 from '../assets/images/ng3.png'
import ng4 from '../assets/images/ng4.png'
import ng5 from '../assets/images/ng5.png'
import cg1 from '../assets/images/cg1.png'
import cg2 from '../assets/images/cg2.png'
import cg3 from '../assets/images/cg3.png'
import cg4 from '../assets/images/cg4.png'
import cg5 from '../assets/images/cg5.png'
import fg1 from '../assets/images/fg1.png'
import fg2 from '../assets/images/fg2.png'
import fg3 from '../assets/images/fg3.png'
import fg4 from '../assets/images/fg4.png'
import fg5 from '../assets/images/fg5.png'
import fg6 from '../assets/images/fg6.png'
import { games } from '../const/data'
import BASE_URL from '../hooks/baseURL'
import useFetch from '../hooks/useFetch'
import launchGame from '../hooks/launchGame'
import useGames from '../hooks/useGames'
import { Button, Spinner } from 'react-bootstrap'

const GamesPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const typeId = searchParams.get('type');
  const providerId = searchParams.get('provider');

  const { data: gameTypes } = useFetch(`${BASE_URL}/game_types`)
  const { data: providers, loading } = useFetch(`${BASE_URL}/providers/${typeId}`)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const { fetchGames } = useGames();
  const [games, setGames] = useState([]);
  const [allGamesLoading, setAllGamesLoading] = useState(false);
  const [isGamesLoading, setIsGamesLoading] = useState(false);

  useEffect(() => {
    setAllGamesLoading(true);
    (async () => {
      setIsGamesLoading(true);
      console.error('in useEffect')
      const data = await fetchGames(providerId, typeId, currentPage);
      setGames([...data.data]);
      const isLast = data.meta.last_page === currentPage;
      setIsLastPage(isLast)
      setIsGamesLoading(false);
      setAllGamesLoading(false);
    })()
  }, [providerId, typeId]);



  const loadMoreHandler = useCallback(
    async () => {
      setIsGamesLoading(true);
      console.warn('in load more ' + Number(currentPage + 1));
      const nextPage = currentPage + 1;
      const data = await fetchGames(providerId, typeId, nextPage);
      console.warn([...games, ...data.data])

      setGames([...games, ...data.data]);
      const isLast = data.meta.last_page == currentPage + 1;
      setIsLastPage(isLast);
      setCurrentPage(nextPage);
      setIsGamesLoading(false);
    },
    [currentPage, games],
  )

  const selectedGameType = gameTypes.find(item => item.id == typeId);
  const selectedProvider = providers.find(item => item.id == providerId);

  const goTo = (providerId) => {
    setCurrentPage(1)
    navigate(`/games?type=${typeId}&provider=${providerId}`);
  }

  return (
    <div className='authBg px-2 px-sm-3 px-md-4   pb-5' style={{ overflowX: 'hidden' }}>
      <GameTabsHeading />

      <div className="pb-5 mb-5">
        {providers.length === 0 && <Spinner className='mt-4' />}
        {!providerId && providers ? <div className='row px-2 mt-4'>
          {providers.map((item, index) => {
            return <div onClick={() => goTo(item.id)} key={index} className="col-4 col-xl-2 px-2 mb-4">
              <img className='img-fluid rounded-3' src={item.image} />
              <button className="gameName fw-semibold mt-2">{item.name}</button>
            </div>
          })}
        </div> : <>
          <h5 className="fw-semibold my-3">{selectedGameType?.name} - {selectedProvider?.code} GAMES</h5>
          {typeId && providerId && <>
            {allGamesLoading && <Spinner className='mt-4' />}
            <div className="row">
              {!isGamesLoading && games.length === 0 && <h5 className="text-center py-5 my-sm-5">The end and no more game!</h5>}
              {games.length > 0 && games.map((item, index) => {
                return <div onClick={launchGame(item.code)} key={index} className="col-4 col-md-3 col-lg-2 px-2 mb-4">
                  <img className='img-fluid' src={item.image} />
                  <button className="d-none d-sm-block gameName fw-semibold mt-2">{item.name}</button>
                  <button className="d-sm-none gameName  fw-semibold mt-2">{item.name.substr(0, 10) + '...'}</button>
                </div>
              })}

            </div>
            <div className="text-center">
              {!isLastPage && <Button onClick={loadMoreHandler} className='w-max mx-auto' variant="outline-light">
                {isGamesLoading && <Spinner size='sm' className='me-2' />}
                Load More</Button>}
            </div>
          </>}
        </>}
      </div>
    </div>
  )
}

export default GamesPage
