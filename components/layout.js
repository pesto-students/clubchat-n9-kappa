import Image from "next/image";
import GroupChat from "../public/undraw-groupchat.svg";

const Layout = (props) => (
  <>
    <div className="container">
      <div className="container-left">
        <div className="imgcontainer">
          <Image src={GroupChat} alt="GroupChat_icon" layout="intrinsic" />
        </div>
      </div>
      <div className="container-right">{props.children}</div>

    </div>

    <style jsx global>{`
      .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
      }
      .container-left {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #1a1d21;
      }
      .imgcontainer {
        width: 80%;
        height: 80%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
      }
      .container-right {
        width: 30%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: #19181d;
      }
      @media screen and (max-width: 770px) {
        .container-left {
          display: none;
        }
        .container-right { 
          width: 100%;
        }
      }
    `}</style>
  </>
)

export default Layout
