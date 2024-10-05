import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/redux/slices/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants/api";
import { Link } from "react-router-dom";
import { RootState } from "../utils/redux/store";
import { cacheResults } from "../utils/redux/slices/searchSlice";

const Head = () => {
    const dispatch = useDispatch();
    const searchCache: any = useSelector((state: RootState) => state.search);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchQuerySuggestion, setSearchQuerySuggestion] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const toggleMenuHandler = () => {
        dispatch(toggleMenu());
    };

    const getSearchSuggestion = async () => {
        if (searchCache[searchQuery]) {
            setSearchQuerySuggestion(searchCache[searchQuery]);
        } else {
            const resp = await fetch(YOUTUBE_SEARCH_API + searchQuery);
            const data = await resp.json();
            dispatch(cacheResults({ [data[0]]: data[1] }));
            setSearchQuerySuggestion(data[1]);
        }
    };

    useEffect(() => {
        const time = setTimeout(getSearchSuggestion, 200);
        return () => {
            clearTimeout(time);
        };
    }, [searchQuery]);
    return (
        <div className="grid grid-flow-col p-5 shadow-lg fixed w-full bg-white">
            <div className="flex col-span-1">
                <img
                    onClick={toggleMenuHandler}
                    className="h-8 cursor-pointer"
                    alt="menu"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0MAAUOBQikpKQpJSadnZ309PUAAAAIAADZ2Nj8/Pyop6cYExXBwMAtKSpta2xpZ2draWpfXV7BwcGvrq77CGWbAAABG0lEQVR4nO3cwXKCMBQFUApFTQAVtf3/Ty3tsKhLZpKSxnP+4M57JCwyt2kAAAAAAAAAAAAAAADgFQ1TX4ZpyJJvvIXYlSGGecyQcI5v5Yi39AGHsHeqJyH9ovYljXAZ4qeEm9W/pc29pCHmOGma8R7iexky3RbLovbHMvR5bnwAAAAAAAAAANhkPJUhV77hcT2U4frI8mToI5zbUpzDJX3A06Hd+7neL22X/mHbpbDXl+mHeOz2DvUk9skT1j/D+r/DZYiVn6UvcB9+2/tnZpUrHgAAAAAAAAAAbDBMe5ftrXK17M619yZq2f1bGfpLp5JGmKWDtv6E9W9p/SfNz22xdxn7Kl/LbuW9+gAAAAAAAAAAAAAAAPCffAHLSDTi5JU+gwAAAABJRU5ErkJggg=="
                ></img>
                {/* <Link to={"/"}> */}
                <img
                    className="h-8 ml-5"
                    alt="youtube-logo"
                    src="data:image/png;base64,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"
                ></img>
                {/* </Link> */}
            </div>
            <div className="col-span-10 px-10">
                <div>
                    <input
                        className="w-1/2 border border-gray-400 p-2 rounded-l-full"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={()=>setShowSuggestions(true)}
                        onBlur={()=>setShowSuggestions(false)}
                    />
                    <button className="bg-gray-100 border border-gray-400 p-2 px-5 rounded-r-full">
                        🔍
                    </button>
                </div>
                {showSuggestions && (
                    <div className="w-[37rem] fixed bg-white">
                        <ul className=" border mt-2 rounded-lg shadow-lg text-start border-gray">
                            {searchQuerySuggestion.map((i) => (
                                <li className="hover:bg-gray-200 px-2 py-1">
                                    {i}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="col-span-1">
                <img
                    className="h-8"
                    alt="user"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKYAAACUCAMAAAAu5KLjAAAAb1BMVEX///8WFhgAAAD8/PwYGBoSEhQUFBf5+fkPDxFAQEDf39/q6ur19fXOzs8AAAXv7+8ICAvY2Ni9vb2amppLS0xubm91dXampqY4ODkyMjKOjo5cXF3GxsaFhYUkJCaurq5mZmZTU1UrKy4eHh59fX6iz+mwAAAKR0lEQVR4nO1c2ZaiMBCFSgJhj+CCrGr7/984WcC2JSwCds8D95zpmWkh3FQlN5WqoGFs2LBhw4YNGzZs2LBhDSDU/pjy679DS8WOPFfCi+yXj/4PoGh3Kg/53nFSDsfZ54fytIv+I5KcYXw4g0DIKKWE8B8slL84H+I/5yqHnR9nOefDLFMDi/GP8iz2jb8dpG62x2FIsKVlyXlamIQh3mfu33GMYm5HKgj2kDSbjyzKbRpHf0LSrnMGVmtGS1hOgo9M0vzzwZ//G1he2+Otro3iGjLybTRCxZyhBFe38/lWYULFjKLPV7DwWvwqRYSCC8CTqxnQc37P6mDHBZMj8nZBnd3zMwX25H6AS/CLM8lOKsAtS8LNmCZcd7rXcaVKUm5U0vLEUCW/4Xlpi8IB2pqIgrlPvIFH216yN5+vdwrjw+qExNLnJxB+PzQtA3twReQf2UGZfhMNIfGbpj5FkzftHcUTLUUSn9yx8ELFH+4JK6KWuO3ofdSe3ATuF1jqcQTOWdT+evAe+XeUnYGo7lnw5X7MmrLhmIByHQ6xtMn0uw3vboZY3Q1W/Cm/Cy/VldIXbPGZ8PaUtfncsxRR9lV/yO+8zRM00sJoxm0hMPlueTHKaKOjBE4fiUX5M04mUZNHiork+cb9SDqZG1RNJGKePuB14fFWVMDRxDuKsx/UCUcd+I9fvcB1oBWzem17iufFjcctKPVmiIK7Co5VQHwPdCERv7VUWsH9Hq88PnlbQdXaMrO7jSPDr3lUx3AzlTHmAXFe+53+8DvtrLVnFaxtTy/lbfNpakGieTK39ZXCUzikrMX2saExGEpAiAXvceqtStKwr8IC3FS6CYqM6PgUCT2BwTHSXM4lQzZmwnXVQET2X3q81LlpdwUdSdExuO66rRlG2bbX8c0SFM3AhLutcWJwg/5tBtyCV5YiGrlDMzzXipR5o1EVKr08dHzEZ27Awj6OAiELNMpgHxTPsIrWmUa885kMgjGrvNcW+YdCCAe3bEJmXz2ADK9iWI6KbC1RKkzC5zimUGg6jvi4bGVIOzoxnyjdu3irQHmjFjFXcnt0ATktWYI0HU+axa/fmmKidGjyphKVgoDLOjvjWI0iuPqaD92K9lNsQStdNsFv9EEsRsthp7LXBLrKImfsgCUfFpUK0cFOLggWS9cQz1PT51IzLo2dOcGY3JzmTnd3o55iyVgK32FigDFNVMQfLDRgAsR81siOy9vmzmCObji9h5q3ZPX12D5r18gu2FnrWOEp3jqrl7KMcukYtvd1YdGuiSGGITYW0PU6b8/fy25CvnSyBypRxI2p0+Ckby3voKtJsp9q4BP2uqC+C7WmsbOOJDIu02letP1EatTAYRlLWwWRWlsI5Zs4NHlHtarb+oPAMk1S0k5vOs3ksbIzSY5kE44+At7dZBMLJf4IMng42trowE2n00y1aW1kH2XgAsf5HEX0I3hYfYKxnKYQPEsa210QzsUy3Uu+OgHcWjR5QPclH0Fnex21AxyuPT1dYWwiQwUgYpLONaev5Ijv+/UtRPvpM32vV3Bk1OoZh/kLppsKGiTUz3OOt3SzBzuZ82Z9Y3cCCqmaA5FBNp1m1teGjG24cs4P4utWjvouCKbT7F0OW0maH36oXepAOOhPid0FaNU/9NS6DvfZNPdyn9O7QiDRkYnx5r1/IquVDvazacrcMO3kAx40Eff6hD2G6GrQv81VSTRWzWXpyyCO6rKZj0uOk0YnHAfkRi11hM1VJFeaiu6H0mbBeFQs4uKheNLbyxUZ5iqSq2LN4dC6HB+dWCTI+hHlKuacS3OnaF4GvWGno26H4R2uf1E0exeREShVDLv5rZ9XnUdEiZ6HtxD2QabK+pV1Gs3jUEggSwdkiCUZKwWg4xo0YZCmLL3hgQiE4Xgk9kFKLZZa8zBsTcGz6h2fUMUGGi4AoXWcPjI2ZcFVVthfpjyW1fPxIurSsdnM9HxMd0WSOhEVc/yTJYU0GS62S/j5spne6OZ1NCUh1kE3qyB8knorhEqcPhpPBUfXZbrpTViFni+vUyZPoMlzZyytp97XrEJza0TIEvfTdNwbqPkTFafyeDgcy1MRPX80aNGd3PhRa/bO8iYjpMGaCB97dnw/lkVLiW+91aZe/ijK4z225WW9UNUcdpvL0shVvDkYV/snR5yMohfN0HIv8iPnNDgJmz1bPptm9tib6oEMP96rw4YWwD32nvyGvPgOcnBbDPZxt8j6QCKDl/7N0iiauPqicZk6meBdvg/7EIDr/VSIM0m2V5zuV/heREO4eO09r7DV9nRBFikwZVx81iiSEG1UVz+Wc3Fak+IvDkxfTnQSqGqkP4QSydCFmPNTnJ7DetcHJNbibmxkWYRDc5yTithA53i11rGerMgU8L0pVoOzW8wzIlFrmbQTkvRF1SXqtoNUAggP7LJHIOvegglLO+5ChpdP3qO3gPw1ZSaaTZnsw5KDNIVKl5mvYjOLJeeSdw8BuKZK+s1OenCHyJSbZYYvBQLbQPf3WQp73tFPpUfGSdbARcJuQSG4Uc6XXRuayVLy/EmmKegsUE0BNQ3J18tcj4f3Ff0gr/IYfKkaxMKKi6pJvnTWm54lfgV9OSyj3EXNZSwfBZHnxu1pqQ49fiqPN1jQmY4dbs35PagKOtPlssf0Mafl8QxpTDw3cm/RJInouZ2JXOpmaNGzOfNGhIWSnEnXwrNQfFli7RPl9Mac8SKW30EGkgV1cYx/vmg+gK6NOYNGOxcaU5lTNtQmTMLukZX3EUNzcqT5fyMh8/EtbyqE68/zvoXLz5Mj5UJjqhNsygDqv/Pj9mcUqqTehFrefvAM1xSEaq/ahImErXMQCZXyHBJWKd9Y/wLTO7CYcIwvo0RsilOrq8C9qYSGLGlMLwX1Qy5qJ3XUkt7WeeMJtfUhdRTpzKbHwj3GNNm5OYTU1INWOsrXapA4lLeCMXlDj5PQUuzXOsPpps15tryG18Tb++DjsVYdt5aUKjWo21PLXJCXTyHZjMSCEqAWauZgc6G0tyDqMOXCaPgVyPCn16SnAy4DyZBZNPnwXJ0niIG56rl3kYg5L15+fiI8v/Mmz2SiwW1VnuFtoNy6hGdxm3y0YxzsVnzmtSa+cvQXVt4FVLuPvC8kX6sJnJV4ghO897rRdJpiJO2caXX+YVjg7MaKWkuY8pYvTL2VPJOguJGwy4oLuR7ybdAFyzpu3gf9IJSbghTIbJ6YQBoYPYnjNZlyoS/x7JkEuPSMz8zxLtfYmZPrEtnWNP4VhpIlj0SSCt4M6Xj4BlWybqwxDje7aSoEA6Bw+4svekBuSYC10tT3TRTqp2UxIKX7u4Z8IEocLL6KYtD5lvgiCuwkf/NFFA3RuExFzaqfpahkpWX8WaUcRPOGvKhNArBu0pNQWV+/x25byP5jRHV5daoQfiCsnGtZ/6Wvf0LayfaK+JSJov/lIgr/2Sku1Fc//AdmFEBPTGzbl7Bt3ad/DNQz9sYPUGzYsGHDhg0bNmzY8D/gH4gqetOFgvajAAAAAElFTkSuQmCC"
                />
            </div>
        </div>
    );
};

export default Head;
