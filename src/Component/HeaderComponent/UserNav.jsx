import { Button, message } from "antd";
import { signOut } from "firebase/auth";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { set_logout } from "../../redux/actions/userAction";
import { localServ } from "../../service/local.service";
import { userServ } from "../../service/user.service";

export default function UserNav() {
  const isLogin = useSelector((state) => {
    return state.userReducer.userInfor;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    dispatch(set_logout());
  };
  return (
    <>
      {isLogin ? (
        <div className="w-full flex justify-between items-center">
          <div className="flex w-2/3 justify-center items-center whitespace-nowrap">
            <span className=" w-14 h-14 overflow-hidden rounded-full border-2 border-cyan-500">
              <img
                className="w-full"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJAAmwMBEQACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABQYDBAcCAQj/xABBEAABAwMDAgMFBQUFCAMAAAABAgMEAAURBhIhMUETUWEUInGBkQcVMkKhI1KxwfAkM2LR4XKCkqLC0uLxFkNT/8QAGwEBAAMBAQEBAAAAAAAAAAAAAAMEBQIBBgf/xAA1EQACAgEDAQUHAwMEAwAAAAAAAQIDEQQSITEFEyJBUTJhcYGhsfCRwdEUI0IGUuHxJDTS/9oADAMBAAIRAxEAPwDuNAKAUAoBQCgFAad0ukG1RFSrjJbjsJIG5Z6nsAOpJ8hzQEI3f7xcebPp91LB/DJubnswPqG8KX9QmvG0gYivVK17l3O0sjPLbcBxzH++XU5/4ayre1qovEU2TKls8qOqUkFq8WxX+Fy2K5+Yd4+lQR7Z/wB0Pr/wddx7wNSXeCo/etmS7GbALkm3vlwgH83hFIOBg5wSfIGr1XaNE8JvGfUjdUkT1ovVtvDbi7bLbf8ADO1xIyFIPkpJwR8xV5NNZRGSFegUAoBQCgFAKAUAoBQCgFAKAi75eE2pthKY7sqVKdDMeO1jc4rBPU8JAAJJPYeeBQEJaLYt2d963/wZF4UVFhAUVsw0ZxtayBztI3Kxk57DiqL11bu7tPj1O9jxkszklpIPvBRHYda5u1tNS65foj1VyZGqVuWSep7V8xObnJyfmW4rCweFqASr3tpx18q8R6ePdSnsUfhx15J/1pnPxBB6hivxbhHvNpbzco+PcScCS3nCmleYwcjPQ4NaHZ+rdM8SfhZ5OrfB46otljvMS9wUy4SlbdxQtDidq21DqlQ7H+u9fTpprKKLWHhkjXp4KAUAoBQCgFAKAUAoBQHzcPOgKNNuUNy/Xa53CY0zFt4+7o/iKwAspSt5Q81EKQn02nHU5p62co1NQXL4JqKpWz2wWWaMnVz0kJ+57TIllz8Dystox6cc/pWDDSLPil+5tR7Prh/7Fqh7vaf0NN6drN10huNDihXJJcaO0475WT28qk7nTx4eX8n/AAieEeyYLMpSl9P4+5gLOt1rz7cjj8wWzj5YTXahRj2H+jJld2Mv8H9f/o9E62ZTvU9HkAdEqUz/AOP8a87vT/7Wvkw59jS/3R/PizInUeoIIS5c7IpxoKyXGgU/PI3A1F/T0z4hLn8+Bx/QaK5/2b8P0a/6NuNqWDelsiO74cgIOEOjGVHy7H5VDPTyrfPQr2aC/TZ7xceq6fnxNm06cj3WS9d33JTEZ8JS01GlLaDuzIDythHPYf4QCc5AG7o1OilRk+Xz8DGuasm2j2dTq0ne3rZd5FwnW0xkvsyjGU84wdygW1qQORgAhRGeuSavV2KaIJRaLfZbxbr5b2p9qltyYrv4XEZHyIPIPoeakOTfoBQCgFAKAUAoD4aAhLvqi3Wx/wBk/ay5xGfY4ifEcA7FXICB6qIHrXE7IwWZM9SbIV1jUV9S6bnK+6oK+ExIp99SOfxOYzn/AGNox0Ueoo36zYsvwr39X8F/J3GGTbZgQLREDUCK02hHZIx89qcZP9c1jz1qlLiPzfP/AATRqZrm7iOCEoAWo8lACfl5/XFePUXPpLC93H2wTRo9Ty9dpC2kttE7jyobjuA+dcrUXR/zZJ/TwPK7vKaZCA6tSh5pJP1GBXKuuk87n+p73FZ9i3l9ToTvJJ81H/uNdSuuis73+oVEGZH7mhW9SghBH4neOPirt865V1z9p5+KycuiK6EdeNJIvtuW6GkNvObShzlt0oJG49OuM4Cs5P7vUbFGnxhz493X/r5Mjhrb6k4Vy8P0LIqciMgNhkIbSNrQRwAB0H8u3lUt09icmQVw3NRRjsBdX7TKKjh5fu+RA7j0/wA6h08p8vJPqFHKRXZlxVovUF5ubdnfescrwFy3Yi0n2Z0A71lvrghTeSP3Sa1Yy3L3lFrB0Jl1D7SHWlJW2tIUhSTkKB6EV0eHugFAKAUAoBQFb1pdZMNiJbrWrbcrm74DK/8A8UgZW5z+6OnqRnjNcTltjk9Rp2qNDs0ZTUJohR952S4cuOq4ytRPJUeOTzyM9OPndRrJSl/bfz8/l6L4E8azA/d31tSXGB4jiEnYgnG844GfWqThmSUn+5bjXiOSrMa906tpx5+eI7qfdcYeaUHUKHUEY5Pw4q3Ls7Ut4Sz70+BG+lLrgqF++01a3FoskQISf/vf4J+CQf4n5VoUdlpJO18+4gnrM+wimTdQ3mcT7Tc5Sh+4hzYgfBKcD9K0YaemHsxRWlbOXVmiHpPDnjP8kgL8RXUds1Lsj6HGWb0DUd6gLC4t0lJx0StwrT9FZFRT01M1iUV+fA7jbOPRlwtP2kJeZXFv8YBDiFIMiMOgIwcoP/T9KoWdm7ZKVL6eT/n+SxHVZWJnY2Lq85M3ggsrbSpog9iOevfp9ahd393d5E/cf2seZ6vYcbgLfaWv2cqCnPF4Vk4GU/5EAdT8bN0VbHOeV9SGiWyeMdT3BvUAMNsRt5dA2pbA6n4jgVxXKMVg6srm5Nsy3SGX7JKte5BkT2nGipScpyoHcoj90Z/gO9T1S2PdIhmt3Q+/Z/NMnTbEV1pTUq2H2CS2o52uNgA4PcEYIPkavFcslAKAUAoBQHw9KApZdF81I/cFKCYFr8WExjkvOkDxlfBIGwY77qzO1L+7q2LrL7ElccvJG6vcvzKA/p9EWay4Muw3htWCP3Vd+c8H157Vjaf+nfhubi/UtRU/ajyc1vWr9XRY+5Vl+7G0HBdcZUvCj5FXGc+YPatenRaWTxu3M5nfcv8AHBSJtwl3OcmXc31vuFQCnF44GenHA71pQrhXHbBYKjk5PMjrOpvsrj3KGm4af2RnlJ3FkZLa/l+X4jj0rPp1VkV41lfUuXU1uWI8M5all+wXjwLzBUAn3ZEZwf3jZ64I+oIPBFX9yshmD+fvKqThLE0XC5aLn2cibZo/3zZJbaXFRT+JbZGQRjrgHhaeR9arRvU3sn4ZepO6tvih4okBe9LBFuN7sS3JNq3FLiFp/axFDqlweh7/APuparvF3c+H9GRzqWN0HlfYrBGeOxqwQHadAayYvzDVsuADVxZRhJCtofAHKk46HHUfOsbV6V1PfHoaumvU1tfVFxlseLHUglayOUBayoBXoCeKqK2S4zwWHXHOTA/EXLO910pKRhsADPT82evw6UVijweuOTE7d5lraRDjMpRIlyEsIuMlW5qOVdN46nk4SBgZUAduedDSShOWJPkztUtr4Ltp6zx7FbEQYyluYUpx15w5W84o5UtXqSSa1CmSdAKAUAoBQHw9KAobBVbLpdLKoJ9x03KN5uMvLPiD1KVlfyUnzrC7WranGfk+CxRy8EZf71Cs7KpNzlJZR7w2bv2i85J2juef+UedUaqJ3vbWs/b9fzqW8xqj4jkOs7zdb4mPMmsuRraVFMRpeRvIAClYPXtz0Gcc81v6XT1UZhHmXmUrrJWcvp5HvQ1jGpYt8tLePbDGTJi57rbJ4+YXj51NbNwlF+R5BJwkd2+zm5G56PgPOgpebT4L6VDBS4nhQI7c1T27G17yaUt2H7jNq3SVt1NBUxNZSHOS26nhaD5g9v6zXi3Qe6HX7jcmtsuUROi7XdLRaHNOTimQG3CIMkg4LR6pV+6pOD9U4qbar+f1ONzqfBYBBtybo/GQ7AXcnI4LzAG1xxvJAKuSSOoBIOMnzqV6eO3bkj72W7ccf1x9mrVsubz0Ihq3yW1qaJPEd4AqCSf3CAR6Ej0FcRvcfDLqvqv5JlUp8x/H/DNnRdtsK7pZWYkCQ1co+9ZkqP8Af/sVle8ZO0bh7uOnAzzUc7u9U4LpgvW9m2aSELZ+pfZAS1ukqkONIQN68qynaPPPT5VkxeeMFja88ENb7s5eStbDpaaS4UhlDeFnA93crJ4PHQAjzpZivhfr9+BfVbVLbPjzM902O6ducQNFSAw8tKU8HONyee3B4PmkHtUVTkroyzzlfn55FK9Zg2dHtjxkW6I+VBZcZQsqHQ5AOa+qMw2qAUAoBQCgFAV3VtheuiYky2utsXWEsqYccHuOJIwppeOdquPgQD2qK6mN0HCXRnUZOLyimOJhtT1IvFnj226eGXVKeQ2oOpT1WhwfiA8jggHoKwrtLqKONzcfzyL8La59VhnHta39Wo754jSlLitDwoqdpBUnzx5k/pgVs6TTrT1YfXzKdtjsl7je+y65Gy69t/j5bS8sxHQocpK+ACP9oJFSXR3wyjit4Z+hI0OLAvEmRFebaEz35LHTc4BjxB5EjAPnx3BzV6r4EnQkm3G3AfDcQsDrsUD6fyrk6yY0RyLgmWtwnYgoQlKcAA9f4D6D1z1XLbPJ5JJxwac+NEbuDl1jWzN1cZ9n9qwNwRnpnP8Ar07Va7xPiJHs9SJ1mwXtHSkIV+0j7d+R02kE9OnHOPKqVscPk0Ozpf8AkQ97RVPsyhZvE+Wrn2WKU7u25Z/jhJriuO2E5e42e3LfYp885/P1GvLklqEm3suJDzywXEjqE8HB+Jx9KqUrndg50sN1m706fH85POipDTcBxtptW4L3v98qI/yA5+Hzg1UNzTz8CLWxnG57/P7ElGYOqJqrbaXz7ArIuMxsEhCO7aFdCtZJBIztGe5FXNDopNqy1dOhkai5Y2xOoNNpabS2hIShKQlKR0AHQVtlE90AoBQCgFAKAYoCvar0ZZNWCP8AfUZbqo+7wlodUgp3Yz0PPQdaAqM77PbbpONKvVifQwiOwpx9E5vxwUpBPuq4Ug9uMg+VQajTxujtba+BJXY4PKRw2Cy9qHUSltsSd8h5claYjKnVtgkq4CQTgEgZxUsY7IKK5wcZzLLP07om5/fFjaneIl1xxCQXMdSBggjsQQcp7EntgnmEdvAZhtMK7MQErvL8WXemnCpbsVOxC0FRwnoOdvHTy64zUGoSTUkuf2JK5cbX0Jou+6EoQorIzs7j4+Vcxi3wjzJD3e7phKLccpfn4xxyhj/X+uBUuY1rC6lvTaSd73S4iQcEuItd4TIWUBxsKU452Uc5Uc+g/Sqdzlt56su6qNatgoehWdG6hgWHTkwPtPuSZDgOxtGAEgBOMkj/ABevNeScY1uGeWzQ1mj1GqujZGOIpev6/X3FRmvKkPOSJBO9Sy4Snk7yeAPM9sfCoYJuW2PwNOfd00re8KKz8zp+kfs/dVaGDqKS8W3T4ztsQEoRk9A6oe8vAABGccdCK04aWqMlLHKPi9Vq7NRZKTfX7HRmmm2m0NtIShCRhKUjAA9BVgqHugFAKAUAoBQCgFAKAhtW6fa1PZHbTIlyIzLyklxccgKUAc7eQeDigImHZ7D9ndoU5a7epbzzjbIIIU/JcWoJSkrPqfQDk0BW5V3XpDUhl3CzSYFjuzn9u3KQ6yw/xtdSUk43dFAgdAa4klJAuOoLkuz2xdxjRHpsdCdy24hSFbeu8eYx5frVdJJ+MkitzxnBGt3STcoDTvuxI7zaV7Gle8QQDyvv1rvLfC4Ro1aauGG+X9DYjWw+HvCUR2RyVqGP06mvVDHIt1aXC5ZSNW3xp91VqthUmMle6Q7nl4jonPdIzz9Bx1qaixZ48jT7I0MrprUW/mPz6FUk+FHjL8UhCBlRPYd/pVXmTwj6SzZXW3J4XVnQPs40SSY9/vjf7UgLhw1p/uQRwtefz+Q/L8a1aKFUvefDdo9pT1ksLiC6L92dNAxU5mH2gFAKAUAoBQCgFAKArV31YmNMcgWmGq4zWlbXR4nhNNHGcKXg5OD+FIUeRkDNcSnGPtM9Sb6GmL1qNzKnBaYZCUkNrS85lR/IVYTt5wN2D16VEtTA67uRpWKenUsoaluER5uKyAxDaWvclh1OQ84AO+4lAUecJOMbuV9uyOUsoQjuZOX9WbJIQ4lEuM8nw1BaQchRCQCOh5I7cfqIIz43QOlHxYkUTTFq1PpK6KskDUcK4QmYPtQbmNFLbfvhO3cFEozk46g4PAxVqLjYjhpoy2/Xch28mDb7DCWvKQqXCuHis7icYTloDI9CB61xOSr4XUt0UTug5SliPq88v0RZZjL10BbVMfUvaEKQG9iNxGTjOSeuOpA5+FRWeLGXwcVrbzg5fJYkRJLzMttSZKFEKCu/qD5dOlUZPPKPvNC63THuuUaMN5LF6gzrlGMm3xnwp+MBkLTz73rtOFY74qbSzhGfJnds0ai+h7HwvL1O+W2/2e5gKt10hyRnH7J9JOfLGetap8V54JQUB9oBQCgFAKAUAoBQGKU4GY7ryujaCo/IZoDk+lX3ZFjakuuPLenLXLdbjjHvOqKyCr59MjpWPqpt2PyLlcVtROwmtjnEVhtK0lJK1ZV0+FQQl4lydSXBg0rqLT0dsWiHNTb5UVSmnI0pQw6rcSVDJ5KiSeD35Gel+zdnc8r3rlfMhisrHX6M19cTZrVnk3WxllItzjalJQsqacWXEpzgYwACTxjufKuaoxnJ5x72iXEliPr0yc5UpVwuL8u9yluGUoFxCSpTSQnJSNn5sZOM9yfOo++lt218L6n0dXZddH9y2O+XkvL5HS9LafLMZpb7BRNdbBKEHaWkdQFHsTxnFeVwy93kjM12uds3FPwpvBZ/uxUcoW+23MKQRvUgKVtPVPPPb/Op5YawzN7xS6cMretrKiXCRcYA3qaGMDklI6p+XX6iqUod3LjozY7J13dWbJ9H1/k5x47YcSjcTnoQenzr3B9U7I5wY5aIx2lxlDqwONyASPn2r2Nkl0eCO6mqaxOKl8iTtOoLrYktvWu5OhsgERJSy6yoeWDyn/dIx5GrNernF+LlGNquxNPbHfV4W/0OyaRvzOpbGxcmWlMlRKHWV8ltxJwpOe/x8sVopprKPkrISrk4y6om69OBQCgFAKAUAoCE1wtTei7+tCilSbZJIIPIPhqoCh2NSW7LbWfajhEVoJajpycbB36/wrBty5y482XoeyiTiNJW8n+xlSepU+vy9Oa5i/EuT2XQiimy2jUU63TbT7e5fYcV2LGAJU+4SveApRwnBG/ORjPHatyppwRRfXJjvFt1farDcEPMMuWspxt9pMp9ln8yVEoTvT2zgkDz6itPStT309TS0FtErEtU/CvdkjNB2piTJTdZDiHEtKywyAME/vHPbPT1FYXaepu0cu624l7/AM5NXW62NsXXTLKfVr7fz+h0aPJSyFnxXEKcUVK3c5J8zj+u1Yj7V1zft8fBGR3KMwuchKVbQHSB7oPf06CrdXbd8WlYk/p/Jy6EYpM1p6KR4Qb8XasrwAF5GAfPPbnyq9HtKF8VHpLnj4e89prxLqcNdQAVISNu1RAA7YNX22pcn2tS30wa9EeQT0Urk8gmvOvJIuODwy6FvpiskvSVnY3HZO5aj5Adc1LGmc3hIqW6yjTxzZNZXl5ne/s+sT+n9MsRJpT7Y4tb74TyEqUc7Qe+BgZ9K14RUIqK8j4fUXSvtlZLqyy10QigFAKAUAoBQGleYqZ1pmw1pCkvx3GiD3CkkfzoDmemDIVpm1ZWxGSmK2lRUNyiUpwfIZyDWFfhWyz6l6D8KJVhxtL6S5LdUrOCo+6k9vLBHwqOteLoey6EozqCyyVt26Q/BecZQglkqStaDgdU/l69auRtsz4YvHwIXUsdVkmbVIYfU/FawplvGATk4UMkc9uTV+ixzjlkE47Xg4gLa7bJUuE6pfuLUjehWwnBx2IwTgZxwevFfWRhXqaYqyKa6888ma5ODzF4Z7anyIKggXF1GSEoLj3OO/Xr/WaqW9kaC326Yv5L/gkjqbl0kyVj6sukYDDYmpPTxEIGfmMfzrF1X+jOzbl/a3QfueV+jJ4a+1Pxc/QtlluSrva1PmMll1Lim1MlQIyQFpOe4zx8zXwPa3Zk+zNZ3Fks5Sln3cp/nuRo03KyO6JzK9xEwL1LjNjagOktjySfeH6GtnT2d7RGb9OfiuGfZ9ny3aeJoPYDZUohISCcmp4e1gs3Y2NvyO+/Z/FTG0XY0mOhl0wGC4AgJJOwZz6+dbp+b9SwYHlQH2gFAKAUAoBQCgFAcn/smnbtOtNyHhqMlx6HuOEvMrO4YzhOUlRTjrwD3rM1lM9++PQs1TWMMT9QQ2UFhpbC3Fe6mKwrxnnPRLaO/wAenwqtVp5zl0ZJKcUja03av/idxsr77Hhy7vFdbmBagVqf3BxPPdQBUMenHTnbSwsFJvPJfWlNNOyJLi2wBkqOR7oA5J+n6CvcZ4OT88v6r9pkSJEhouLddWsLT7u4Ekg4OccY4ya+tpr2Vxj04KE+ZNhm8wZD6hIy2lSejqcgnv6eVe7fEeYaRIx4sZACogShB6BpWEn5dK9wjxtlo0ZMbbmvQluDZIRhJBB2uJ5H8/oK+G/1toJWUQ1lay4PD+D/AGT+5oaCzl1vzPurtLyZs6LNAcEcNeHLMVsOupKThKggkbhjrjnpjNfKdk67SxzVc8Jvh+XwNyvtDUaevbXjGcni26d0PELMu76panN7vdjrUhpJI7LQPe4x0OB5ivra6KoeJFfU9qarUR2SeF6Lj9ToDGsdOON7mLow42OCpsEpTjsSBgV3K6uDxKST+KM/DJG13m23dBXbJ0aUkdfCcCiPiOoqU8N6gPtAKAUAoBQCgFAYZMWPLb8OUw08jOdriAofrQHiJAhwgRDiMMA9fCbCc/SgMN3tUS8RPZprZUgLS4hSVFKm1pOUqSRyCCOtAQS9GGYz7NebxNnQ9gQpgbWPFA6eIpsBSj8CAfKgI6Z9kekJCFBiDIiuEYDjUtwn6KURUsb7IvKkzxxT8ij6g+xu6w9z1ilt3BoZIYdwy78lZ2qP/DV2rtKcX41n4cEcql5FLgmXZbqqLPK4LqeXI8lspyPPj+IzWvRqa7/Zl8vMrTrceqLWuO2+pt9Cyh1JCm3mlYUkg5BB+Xwrq6mF1cq7FlNYZHCTg015Ft01qG6T5wt061LllKQRNi4A25xlSSfd6joT54AzX5t2t/o/uG7NJZw/8Zfs+fquPU1qdZv9pFgvMlmy26ZKRGDcrw8pbSkJW6s4SkA9yVFI79RXy0ezNd/U103ReG/ivvgsb44yR676iI6j2uDdID20gtuW9x7ceMDc2FBXfnNW59g66Ph2qSz6pevr/B738GjQmxLg4lu6X3Tz7DmC43cLe7vkwxyQFpA3DAxkJ3g85Hnrx7K1ujSlpbM46xfR/t9mRd5CXEkWnQ+pBeoi40qQw9OjBO91kjZIbP4XU46A4II7KBFb2nu76Ck1h+afk/Qgawyz1OeCgFAKAUAoBQCgFAKAUAoD4aAi9QaeteooZi3eI3Ib52qI99s+aVdUn4UTaeUDkkPQd6t+qZlptM+K7EYS29iYtSFFpeQCAlJyQUqGeMkdK2KO1EoYtWX6+pXnQm+DqOk7JH0/aW4qXEvPpH7d4fmUO3oB0ArNvvldPcyWMdqwQ0Zpm8/aA6q8IKlQI6XrS2oAoUhRwt3pkrCkj0AKT1NV4zUuF5HeMF3AxXQHbFARsawWuLd3bvGhMtT3m/CcfQnBWnIOD8wOfSgJOgFAKAUAoBQCgFAKAUAoBQCgFAQt/sLd18GSw6YlyikKjTEJypHIJSRkbkHHKT+h5oCKGjHZ/ip1DdnZjLqdqosRBitK4xuVtUVKI7ZVj0zzQEYqLcZC34aZRVqGwLC4UxwgGUw4nIDnHRWChXHVG4YOKr2f25bkSR8SwWrTV+avcZ3c0qNNjr8OVEc/Eyv+aT1ChwamjJSWUcNNPDJiujwUAoBQCgP/2Q=="
                alt=""
              />
            </span>
            <span className="">Khang Nguyên</span>
          </div>
          <div className="w-1/3">
            <Button onClick={handleLogOut} type="primary" danger>
              Log out
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-evenly items-center">
          <div className="flex w-1/3 ">
            <Button
              onClick={() => {
                navigate("/signup");
              }}
              type="primary"
              danger
            >
              Sign up
            </Button>
          </div>
          <div className="w-1/3">
            <Button
              onClick={() => {
                navigate("/login");
              }}
              type="primary"
              danger
            >
              Login
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
