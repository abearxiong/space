import React from 'react';
import Styles from './FaceEmjoy.less';

const emjoy =
  '😄 😊 😃 😉 😍 😘 😚 😳 😁 😌 😜 😝 😒 😏 😓 😔 😖 😥 😰 😨 😣 😢 😭 😂 😱 😠 😪 😷 😇 😋 😧 😦 😯 😵 😛 😶 😎 😅 😟 👍 👎 👏 🙏 ✊ ❗ 🔞 🚳 📵 🆙 🐲 💣 💥 🎲 💰 🔔 🔕 💩 🌹';
const emjoyList = emjoy.split(' ');

type Props = {
  showFace: boolean;
  chooseFace: (emjoy?: string) => void;
};
export const FaceEmjoy = ({ showFace, chooseFace }: Props) => {
  const sendFace = (emjoy: string) => {
    // this.props.parent.getFaceItem(this, emjoy);
    chooseFace(emjoy);
  };
  return (
    <section
      className={Styles.FaceEmjoy}
      style={{ display: showFace ? 'block' : 'none' }}
    >
      <div className='face-container'>
        {emjoyList.map((item) => (
          <span className='emjoy' onClick={() => sendFace(item)} key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
};
export default FaceEmjoy;
