import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const A = "/assets";

function Dust() {
  const dots = Array.from({ length: 34 }, (_, i) => i);
  return (
    <div className="dust" aria-hidden="true">
      {dots.map((i) => (
        <span
          key={i}
          className="dust-dot"
          style={{
            "--x": `${(i * 37) % 100}%`,
            "--y": `${(i * 61) % 100}%`,
            "--delay": `${(i % 11) * -0.8}s`,
            "--duration": `${7 + (i % 7)}s`,
            "--size": `${1 + (i % 3)}px`,
          }}
        />
      ))}
    </div>
  );
}

function MusicControl({ audioRef, playing, setPlaying }) {
  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <button className="music-control" onClick={toggle} aria-label={playing ? "Pause music" : "Play music"}>
      <span className={playing ? "music-bars playing" : "music-bars"}>
        <i />
        <i />
        <i />
      </span>
      <span>{playing ? "Music" : "Sound"}</span>
    </button>
  );
}

function BirthdayLetter() {
  const [opened, setOpened] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const openLetter = async () => {
    if (opened) return;
    setOpened(true);
    window.setTimeout(() => setLetterVisible(true), 2850);

    // The click gives us permission to start audio in browsers that block autoplay.
    if (audioRef.current) {
      try {
        audioRef.current.volume = 0.18;
        await audioRef.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }

  };

  useEffect(() => {
    const handleKey = (event) => {
      if ((event.key === "Enter" || event.key === " ") && !opened) {
        event.preventDefault();
        openLetter();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [opened]);

  return (
    <main className={opened ? "birthday opened" : "birthday"}>
      <audio ref={audioRef} loop preload="auto">
        {/* Add your music file here later:
            /assets/audio/music.mp3
        */}
        <source src="/assets/audio/music.mp3" type="audio/mpeg" />
      </audio>

      <div className="background-vignette" />
      <Dust />

      <div className="ambient-orb orb-one" />
      <div className="ambient-orb orb-two" />

      <div className="floral-border" aria-hidden="true">
        <div className="floral-edge floral-edge-top">
          <img src={`${A}/decorations/flower.png`} alt="" />
          <img src={`${A}/decorations/dried-flowers.png`} alt="" />
          <img src={`${A}/decorations/flower.png`} alt="" />
          <img src={`${A}/decorations/dried-flowers.png`} alt="" />
        </div>
        <div className="floral-edge floral-edge-right">
          <img src={`${A}/decorations/dried-flowers.png`} alt="" />
          <img src={`${A}/decorations/flower.png`} alt="" />
          <img src={`${A}/decorations/dried-flowers.png`} alt="" />
        </div>
        <div className="floral-edge floral-edge-bottom">
          <img src={`${A}/decorations/dried-flowers.png`} alt="" />
          <img src={`${A}/decorations/flower.png`} alt="" />
          <img src={`${A}/decorations/dried-flowers.png`} alt="" />
          <img src={`${A}/decorations/flower.png`} alt="" />
        </div>
        <div className="floral-edge floral-edge-left">
          <img src={`${A}/decorations/flower.png`} alt="" />
          <img src={`${A}/decorations/dried-flowers.png`} alt="" />
          <img src={`${A}/decorations/flower.png`} alt="" />
        </div>
      </div>

      <section className="opening-screen" aria-hidden={opened}>
          <div className="opening-welcome">
            <h1>A letter awaits you</h1>
          </div>

          <div className="opening-ornament ornament-top">✦</div>

          <div className="intro">
            <p className="eyebrow">A LITTLE SOMETHING FOR YOU</p>
            <p className="instruction">Open it when you're ready.</p>
          </div>

          <button
            className="envelope-button"
            onClick={openLetter}
            aria-label="Open your birthday letter"
          >
            <span className="envelope-glow" />
            <span className="envelope-shadow" />
            <img
              src={`${A}/envelope/envelope.png`}
              alt="An antique envelope"
              className="envelope"
            />
            <span className="click-hint">click to open</span>
          </button>

          <div className="opening-ornament ornament-bottom">✦</div>
      </section>

      {opened && (
        <section className="transition-message" aria-hidden={letterVisible}>
          <span>For you...</span>
        </section>
      )}

      <section className={letterVisible ? "letter-stage visible" : "letter-stage"} aria-hidden={!letterVisible}>
        <div className="letter-scene">
          <div className="decor decor-flower">
            <img src={`${A}/decorations/flower.png`} alt="" />
          </div>

          <div className="decor decor-dried">
            <img src={`${A}/decorations/dried-flowers.png`} alt="" />
          </div>

          <div className="decor decor-feather">
            <img src={`${A}/decorations/feather-ink.png`} alt="" />
          </div>

          <div className="letter">
            <div className="letter-inner">
              <div className="letter-corner top-left">❦</div>
              <div className="letter-corner top-right">❦</div>

              <p className="letter-date">On this beautiful day</p>

              <h2>My Dearest, Doaa</h2>

              <div className="letter-body">
                <p>
                  Today is a little different from every other day, because
                  today is the day the world was lucky enough to have you in it.
                </p>

                <p>
                  I hope this new year of your life brings you countless little
                  moments that make you smile, people who make you feel loved,
                  and memories you will want to keep forever.
                </p>

                <p>
                  You deserve beautiful things, quiet happiness, unexpected
                  laughter, and all the warmth that life can possibly give.
                </p>

                <p>
                  So, on your birthday, I simply wanted to leave you a little
                  reminder:
                  <br />
                  <em>you are very, very special.</em>
                </p>

                <p>
                  Thank you for being you, and for making the world around you
                  a little brighter just by being in it.
                </p>
              </div>

              <div className="signature">
                <p>With all my heart,</p>
                <strong>Jerry</strong>
              </div>

              <div className="letter-seal">✦</div>
              <div className="letter-corner bottom-left">❦</div>
              <div className="letter-corner bottom-right">❦</div>
            </div>
          </div>

        
        </div>
      </section>

      {opened && <MusicControl audioRef={audioRef} playing={playing} setPlaying={setPlaying} />}

      <footer className={opened ? "footer opened-footer" : "footer"}>
        
      </footer>
    </main>
  );
}

function App() {
  return <BirthdayLetter />;
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
