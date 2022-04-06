import Router from "next/router";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { JWTPayloadTypes, UserTypes } from "@/data-types";

export const getUserID = (token: string) => {
  const decoded: JWTPayloadTypes = jwtDecode(token);
  const user: UserTypes = decoded.user;
  return user.id;
};

export const getUsername = (token: string) => {
  const decoded: JWTPayloadTypes = jwtDecode(token);
  const user: UserTypes = decoded.user;
  return user.username;
};

export const getUserEmail = (token: string) => {
  const decoded: JWTPayloadTypes = jwtDecode(token);
  const user: UserTypes = decoded.user;
  return user.email;
};

export const getUserAdmin = (token: string) => {
  const decoded: JWTPayloadTypes = jwtDecode(token);
  const user: UserTypes = decoded.user;
  return user.admin;
};

export const setLogout = async (isMobile: boolean = false) => {
  Cookies.remove("token");
  if (!isMobile) {
    await Router.push("/login");
  }
};

export const getAccount = (token: string) => {
  const account = {
    id: 0,
    username: "",
    email: "",
    admin: 0,
  };

  if (token) {
    const decoded: JWTPayloadTypes = jwtDecode(token);
    const user: UserTypes = decoded.user;
    account.id = user.id;
    account.username = user.username;
    account.email = user.email;
    account.admin = user.admin;

    return account;
  }
  return account;
};

export const convertTimestamp = (
  timestamp: number,
  fullTime: boolean = true,
  onlyDate: boolean = false,
  onlyTime: boolean = false
) => {
  const date = new Date(timestamp * 1000);
  const months: Array<string> = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = months[date.getMonth()];
  const dateNumb = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const days: Array<string> = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayname = days[date.getDay()];

  const formatTime = (waktu: number) => {
    if (waktu > 9) return waktu;
    else return `0${waktu}`;
  };

  let time: string = "";
  if (fullTime) {
    time = `${dayname}, ${formatTime(dateNumb)} ${month} ${year}, ${formatTime(
      hour
    )}:${formatTime(min)}:${formatTime(sec)}`;
  } else if (onlyDate) {
    time = `${dayname}, ${formatTime(dateNumb)} ${month} ${year}`;
  } else if (onlyTime) {
    time = `${formatTime(hour)}:${formatTime(min)}:${formatTime(sec)}`;
  }

  return time;
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  }).format(number);
};

export const formatNum = (number: number) => {
  return new Intl.NumberFormat("en-US", {
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  }).format(number);
};

export const getVipType = (vip: number) => {
  if (vip === 0) return "None";
  else if (vip === 1) return "Basic Donator";
  else if (vip === 2) return "Advanced Donator";
  else if (vip === 3) return "Professional Donator";
  else if (vip === 4) return "Lifetime Donator";
  else return "None";
};

export const getVehicleName = (model: number) => {
  let vehName = "None";

  if (model < 400 || model > 611) return vehName;

  const g_arrVehicleNames: Array<string> = [
    "Landstalker",
    "Bravura",
    "Buffalo",
    "Linerunner",
    "Perrenial",
    "Sentinel",
    "Dumper",
    "Firetruck",
    "Trashmaster",
    "Stretch",
    "Manana",
    "Infernus",
    "Voodoo",
    "Pony",
    "Mule",
    "Cheetah",
    "Ambulance",
    "Leviathan",
    "Moonbeam",
    "Esperanto",
    "Taxi",
    "Washington",
    "Bobcat",
    "Whoopee",
    "BF Injection",
    "Hunter",
    "Premier",
    "Enforcer",
    "Securicar",
    "Banshee",
    "Predator",
    "Bus",
    "Rhino",
    "Barracks",
    "Hotknife",
    "Trailer",
    "Previon",
    "Coach",
    "Cabbie",
    "Stallion",
    "Rumpo",
    "RC Bandit",
    "Romero",
    "Packer",
    "Monster",
    "Admiral",
    "Squalo",
    "Seasparrow",
    "Pizzaboy",
    "Tram",
    "Trailer",
    "Turismo",
    "Speeder",
    "Reefer",
    "Tropic",
    "Flatbed",
    "Yankee",
    "Caddy",
    "Solair",
    "Berkley's RC Van",
    "Skimmer",
    "PCJ-600",
    "Faggio",
    "Freeway",
    "RC Baron",
    "RC Raider",
    "Glendale",
    "Oceanic",
    "Sanchez",
    "Sparrow",
    "Patriot",
    "Quad",
    "Coastguard",
    "Dinghy",
    "Hermes",
    "Sabre",
    "Rustler",
    "ZR-350",
    "Walton",
    "Regina",
    "Comet",
    "BMX",
    "Burrito",
    "Camper",
    "Marquis",
    "Baggage",
    "Dozer",
    "Maverick",
    "News Chopper",
    "Rancher",
    "FBI Rancher",
    "Virgo",
    "Greenwood",
    "Jetmax",
    "Hotring",
    "Sandking",
    "Blista Compact",
    "Police Maverick",
    "Boxville",
    "Benson",
    "Mesa",
    "RC Goblin",
    "Hotring Racer A",
    "Hotring Racer B",
    "Bloodring Banger",
    "Rancher",
    "Super GT",
    "Elegant",
    "Journey",
    "Bike",
    "Mountain Bike",
    "Beagle",
    "Cropduster",
    "Stunt",
    "Tanker",
    "Roadtrain",
    "Nebula",
    "Majestic",
    "Buccaneer",
    "Shamal",
    "Hydra",
    "FCR-900",
    "NRG-500",
    "HPV1000",
    "Cement Truck",
    "Tow Truck",
    "Fortune",
    "Cadrona",
    "SWAT Truck",
    "Willard",
    "Forklift",
    "Tractor",
    "Combine",
    "Feltzer",
    "Remington",
    "Slamvan",
    "Blade",
    "Streak",
    "Freight",
    "Vortex",
    "Vincent",
    "Bullet",
    "Clover",
    "Sadler",
    "Firetruck",
    "Hustler",
    "Intruder",
    "Primo",
    "Cargobob",
    "Tampa",
    "Sunrise",
    "Merit",
    "Utility",
    "Nevada",
    "Yosemite",
    "Windsor",
    "Monster",
    "Monster",
    "Uranus",
    "Jester",
    "Sultan",
    "Stratum",
    "Elegy",
    "Raindance",
    "RC Tiger",
    "Flash",
    "Tahoma",
    "Savanna",
    "Bandito",
    "Freight Flat",
    "Streak Carriage",
    "Kart",
    "Mower",
    "Dune",
    "Sweeper",
    "Broadway",
    "Tornado",
    "AT-400",
    "DFT-30",
    "Huntley",
    "Stafford",
    "BF-400",
    "News Van",
    "Tug",
    "Trailer",
    "Emperor",
    "Wayfarer",
    "Euros",
    "Hotdog",
    "Club",
    "Freight Box",
    "Trailer",
    "Andromada",
    "Dodo",
    "RC Cam",
    "Launch",
    "LSPD Car",
    "SFPD Car",
    "LVPD Car",
    "Police Rancher",
    "Picador",
    "S.W.A.T",
    "Alpha",
    "Phoenix",
    "Glendale",
    "Sadler",
    "Luggage",
    "Luggage",
    "Stairs",
    "Boxville",
    "Tiller",
    "Utility Trailer",
  ];

  vehName = g_arrVehicleNames[model - 400];
  return vehName;
};

export const getVehicleHealth = (health: number) => {
  if (health > 650) return "Good";
  else if (health > 550) return "Engine is overheating";
  else if (health > 390) return "Engine is overheating pretty badly";
  else if (health > 250) return "Engine is getting really hot";
  else return "Rngine will catch fire";
};

export const isTokenValid = (token: string) => {
  if (token) {
    const decoded: JWTPayloadTypes = jwtDecode(token);
    if (decoded.exp > Date.now() / 1000) return true;
    else return false;
  }
  return false;
};

export const isValidEmail = (email: string) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const randomString = (length: number) => {
  let text: string = "";
  const possible: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*)(~`';:.<,>/?-_+=[{]}|";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

export const setDisabled = (button: any, value: boolean) => {
  button.disabled = value;
};

export const getAdminLevel = (level: number) => {
  const AdminRanks: Array<string> = [
    "No",
    "Helper",
    "Admin Level 1",
    "Admin Level 2",
    "Admin Level 3",
    "Admin Level 4",
    "Sr. Admin",
    "Lead Admin",
    "Deputy Head Admin",
    "Head Admin",
  ];

  return AdminRanks[level];
};

export const API_HOST = process.env.NEXT_PUBLIC_API;
export const PUBLIC_URL = process.env.NEXT_PUBLIC_URL;
export const USER_EMAIL = process.env.NEXT_PUBLIC_USER_EMAIL;
export const USER_PASSWORD = process.env.NEXT_PUBLIC_USER_PASSWORD;
export const jwtSecret: string =
  process.env.JWT_TOKEN || "X3TsehNIkXwY4cbsB0JZtiYfPtch08G8zlmfowSwxqCFZ4HS8H";
