(() => {
  "use strict";

  const tracks = [
    { title: "Heeriye", artist: "Jasleen Royal ft. Arijit Singh", language: "Hindi", energy: 3, tags: ["house", "chill", "romance"] },
    { title: "What Jhumka?", artist: "Arijit Singh, Jonita Gandhi", language: "Hindi", energy: 4, tags: ["wedding", "desi", "party"] },
    { title: "London Thumakda", artist: "Labh Janjua, Sonu Kakkar, Neha Kakkar", language: "Hindi", energy: 5, tags: ["wedding", "desi", "party"] },
    { title: "Gallan Goodiyaan", artist: "Yashita Sharma, Manish Kumar Tipu, Farhan Akhtar", language: "Hindi", energy: 5, tags: ["wedding", "party"] },
    { title: "Badtameez Dil", artist: "Benny Dayal", language: "Hindi", energy: 5, tags: ["throwback", "party"] },
    { title: "Kala Chashma", artist: "Amar Arshi, Badshah, Neha Kakkar", language: "Hindi", energy: 5, tags: ["wedding", "desi", "party"] },
    { title: "Abhi Toh Party Shuru Hui Hai", artist: "Badshah, Aastha Gill", language: "Hindi", energy: 5, tags: ["party", "desi"] },
    { title: "Tauba Tauba", artist: "Karan Aujla", language: "Punjabi", energy: 5, tags: ["party", "desi"] },
    { title: "Softly", artist: "Karan Aujla", language: "Punjabi", energy: 4, tags: ["house", "chill", "desi"] },
    { title: "Born To Shine", artist: "Diljit Dosanjh", language: "Punjabi", energy: 5, tags: ["party", "desi"] },
    { title: "Brown Munde", artist: "AP Dhillon, Gurinder Gill, Shinda Kahlon", language: "Punjabi", energy: 4, tags: ["house", "party", "desi"] },
    { title: "Amplifier", artist: "Imran Khan", language: "Punjabi", energy: 4, tags: ["throwback", "desi"] },
    { title: "Zingaat", artist: "Ajay-Atul", language: "Hindi", energy: 5, tags: ["wedding", "party", "desi"] },
    { title: "Apsara Aali", artist: "Bela Shende, Ajay-Atul", language: "Marathi", energy: 5, tags: ["wedding", "party", "desi"] },
    { title: "Gulabi Sadi", artist: "Sanju Rathod", language: "Marathi", energy: 5, tags: ["party", "desi"] },
    { title: "Wajle Ki Bara", artist: "Ajay-Atul", language: "Marathi", energy: 5, tags: ["wedding", "party"] },
    { title: "Levitating", artist: "Dua Lipa", language: "English", energy: 4, tags: ["house", "party"] },
    { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", language: "English", energy: 5, tags: ["throwback", "party"] },
    { title: "I Gotta Feeling", artist: "The Black Eyed Peas", language: "English", energy: 5, tags: ["throwback", "party"] },
    { title: "September", artist: "Earth, Wind & Fire", language: "English", energy: 4, tags: ["throwback", "house"] },
    { title: "Blinding Lights", artist: "The Weeknd", language: "English", energy: 4, tags: ["late", "party"] },
    { title: "Save Your Tears", artist: "The Weeknd", language: "English", energy: 3, tags: ["late", "chill"] },
    { title: "Shape of You", artist: "Ed Sheeran", language: "English", energy: 4, tags: ["house", "party"] },
    { title: "Can't Stop the Feeling!", artist: "Justin Timberlake", language: "English", energy: 4, tags: ["house", "party"] },
    { title: "Dynamite", artist: "BTS", language: "English", energy: 5, tags: ["party", "full"] },
    { title: "Aaj Ki Raat", artist: "Madhubanti Bagchi, Divya Kumar", language: "Hindi", energy: 4, tags: ["wedding", "desi", "party"] },
    { title: "Morni", artist: "Badshah, Sharvi Yadav", language: "Hindi", energy: 5, tags: ["wedding", "desi", "party"] },
    { title: "Naatu Naatu", artist: "Rahul Sipligunj, Kaala Bhairava", language: "Telugu", energy: 5, tags: ["party", "full"] },
    { title: "Arabic Kuthu", artist: "Anirudh Ravichander, Jonita Gandhi", language: "Tamil", energy: 5, tags: ["party", "full"] },
    { title: "Jhoome Jo Pathaan", artist: "Arijit Singh, Sukriti Kakar", language: "Hindi", energy: 4, tags: ["party", "desi"] }
  ];

  const vibeButtons = [...document.querySelectorAll("#vibeChoices .choice")];
  const languageSelect = document.getElementById("language");
  const durationSelect = document.getElementById("duration");
  const extraInput = document.getElementById("extra");
  const generateButton = document.getElementById("generate");
  const result = document.getElementById("result");
  const trackList = document.getElementById("trackList");
  const copyButton = document.getElementById("copySet");
  const energyBars = document.getElementById("energyBars");
  const energyCaption = document.getElementById("energyCaption");
  let selectedVibe = "House party";
  let latestSet = [];

  const vibeTag = {
    "House party": "house", "Pre-game": "party", "Wedding scene": "wedding",
    "Late night": "late", "Chill hangout": "chill", "Full send": "full"
  };

  vibeButtons.forEach(button => {
    button.addEventListener("click", () => {
      vibeButtons.forEach(item => item.classList.toggle("active", item === button));
      selectedVibe = button.dataset.vibe || "House party";
    });
  });

  document.querySelectorAll("[data-preset]").forEach(link => {
    link.addEventListener("click", () => {
      const preset = link.dataset.preset;
      const matching = vibeButtons.find(button => button.dataset.vibe === preset);
      if (matching) matching.click();
    });
  });

  function languageMatches(track, choice) {
    if (choice === "Hindi only") return track.language === "Hindi";
    if (choice === "Punjabi only") return track.language === "Punjabi";
    if (choice === "English + International") return track.language === "English";
    if (choice === "Hindi + Punjabi") return ["Hindi", "Punjabi"].includes(track.language);
    if (choice === "Desi + English mix") return ["Hindi", "Punjabi", "Marathi", "English"].includes(track.language);
    return true;
  }

  function scoreTrack(track, tag, index) {
    let score = Math.random() * 1.2;
    if (track.tags.includes(tag)) score += 4;
    if (selectedVibe === "Full send" && track.energy >= 4) score += 3;
    if (selectedVibe === "Chill hangout" && track.energy <= 3) score += 3;
    if (selectedVibe === "Late night" && track.energy <= 4) score += 1;
    if (selectedVibe === "Wedding scene" && track.tags.includes("wedding")) score += 2;
    return score + index * 0.0001;
  }

  function searchUrl(track) {
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(track.title + " " + track.artist + " official");
  }

  function buildSet() {
    const minutes = Number(durationSelect.value) || 90;
    const language = languageSelect.value;
    const targetCount = Math.max(10, Math.round(minutes / 3.5));
    const tag = vibeTag[selectedVibe] || "house";
    const pool = tracks.filter(track => languageMatches(track, language));
    const ranked = pool.map((track, index) => ({ track, score: scoreTrack(track, tag, index) }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.track);

    if (!ranked.length) return [];

    const chosen = ranked.slice(0, Math.min(targetCount, ranked.length));
    const warm = chosen.filter(track => track.energy <= 3);
    const build = chosen.filter(track => track.energy === 4);
    const peak = chosen.filter(track => track.energy >= 5);
    const ordered = [...warm, ...build, ...peak];
    if (selectedVibe === "Chill hangout" || selectedVibe === "Late night") {
      ordered.sort((a, b) => a.energy - b.energy);
    }
    return ordered;
  }

  function renderSet() {
    latestSet = buildSet();
    if (!latestSet.length) {
      trackList.innerHTML = "<li>No matching sample tracks yet. Try another sound selection.</li>";
      return;
    }
    const minutes = Number(durationSelect.value) || 90;
    document.getElementById("resultTitle").textContent = selectedVibe.toUpperCase() + " / ROCK.PLAYLIST";
    document.getElementById("resultMeta").textContent = languageSelect.value.toUpperCase() + " · " + minutes + " MINUTES · " + latestSet.length + " SAMPLE TRACKS";
    trackList.replaceChildren();
    if (energyBars) {
      energyBars.replaceChildren();
      latestSet.forEach((track, index) => {
        const bar = document.createElement("span");
        const phase = track.energy >= 5 ? "peak" : track.energy === 4 ? "build" : "warm";
        bar.className = "energy-bar " + phase;
        bar.style.height = (18 + track.energy * 13) + "px";
        bar.title = track.title + " · energy " + track.energy + "/5";
        energyBars.append(bar);
      });
      energyCaption.textContent = latestSet.length + " TRACKS · " + minutes + " MIN · ENERGY FLOW";
    }
    latestSet.forEach((track, index) => {
      const li = document.createElement("li");
      const name = document.createElement("span");
      name.textContent = track.title + " — " + track.artist;
      const detail = document.createElement("small");
      detail.textContent = track.language.toUpperCase() + " · " + (track.energy >= 5 ? "PEAK" : track.energy === 4 ? "BUILD" : "WARM-UP");
      const link = document.createElement("a");
      link.href = searchUrl(track);
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "LISTEN ↗";
      link.className = "track-link";
      link.style.cssText = "color:#c9f36a;font:9px 'DM Mono',monospace;text-decoration:none;margin-left:12px;white-space:nowrap";
      li.append(name, detail, link);
      trackList.append(li);
    });
    result.hidden = false;
    result.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  generateButton.addEventListener("click", renderSet);

  copyButton.addEventListener("click", async () => {
    if (!latestSet.length) return;
    const text = [
      "ROCK.PLAYLIST — " + selectedVibe,
      languageSelect.value + " · " + durationSelect.value + " minutes",
      "",
      ...latestSet.map((track, index) => (index + 1) + ". " + track.title + " — " + track.artist + " (" + track.language + ")")
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      copyButton.textContent = "COPIED ✓";
      window.setTimeout(() => { copyButton.textContent = "COPY TRACKLIST ↗"; }, 1800);
    } catch {
      copyButton.textContent = "COPY NOT AVAILABLE";
    }
  });

  if (extraInput) extraInput.addEventListener("keydown", event => {
    if (event.key === "Enter") renderSet();
  });
})();