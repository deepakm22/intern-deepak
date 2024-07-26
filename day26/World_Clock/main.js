updateClocks = () => {
    let now = new Date();

    const offsets = {
        'New York': -5 * 60 * 60 * 1000,
        'London': 0,
        'Tokyo': 9 * 60 * 60 * 1000,
        'Sydney': 10 * 60 * 60 * 1000,
        'Austraila':8 * 60 * 60 * 1000,
        'Europe' : 1 * 60 * 60 * 1000,
        'Chicago' : -6 * 60 * 60 * 1000,
        'Denver' : -7 * 60 * 60 * 1000,
        'Mexico' : -6 * 60 * 60 * 1000,
        'Dubai' : 4 * 60 * 60 * 1000,
        'Moscow' : 3 * 60 * 60 * 1000,
        'New Delhi' : 5.5 * 60 * 60 * 1000  
  
  
    };

    const newYorkTime = new Date(now.getTime() + offsets['New York']);
    const londonTime = new Date(now.getTime() + offsets['London']);
    const tokyoTime = new Date(now.getTime() + offsets['Tokyo']);
    const sydneyTime = new Date(now.getTime() + offsets['Sydney']);
    const austrailaTime = new Date(now.getTime() + offsets['Austraila']);
    const europeTime = new Date(now.getTime() + offsets['Europe']);
    const chicagoTime = new Date(now.getTime() + offsets['Chicago']);
    const denverTime = new Date(now.getTime() + offsets['Denver']);
    const mexicoTime = new Date(now.getTime() + offsets['Mexico']);
    const dubaiTime = new Date(now.getTime() + offsets['Dubai']);
    const moscowTime = new Date(now.getTime() + offsets['Moscow']);
    const newDelhiTime = new Date(now.getTime() + offsets['New Delhi']);




    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();


        return `${hours}:${minutes}:${seconds}`;
    };

    document.getElementById('new-york-time').textContent = formatTime(newYorkTime);
    document.getElementById('london-time').textContent = formatTime(londonTime);
    document.getElementById('tokyo-time').textContent = formatTime(tokyoTime);
    document.getElementById('sydney-time').textContent = formatTime(sydneyTime);
    document.getElementById('austraila-time').textContent = formatTime(austrailaTime);
    document.getElementById('europe-time').textContent = formatTime(europeTime);
    document.getElementById('chicago-time').textContent = formatTime(chicagoTime);
    document.getElementById('denver-time').textContent = formatTime(denverTime);
    document.getElementById('mexico-time').textContent = formatTime(mexicoTime);
    document.getElementById('dubai-time').textContent = formatTime(dubaiTime);
    document.getElementById('moscow-time').textContent = formatTime(moscowTime);
    document.getElementById('new-Delhi-time').textContent = formatTime(newDelhiTime);





}
setInterval(updateClocks, 1000);

updateClocks();
