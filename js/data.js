'use strict';
/* content data */
/* ---------- content data ---------- */
var OCC=[
 {id:'birthday',label:'Birthday',desc:'Cake, candles, and a note that says you remembered.',theme:'confetti',title:'Happy birthday',ph:'Happy birthday! I hope today feels as bright as you make everyone else\'s days…',
  s:['Happy birthday, {to}! Another year of you being you is something I\'m grateful for. I hope today is full of cake, laughter, and people who adore you.','{to}, a short list of why today matters: you make ordinary days better, you show up, and you\'re easy to love. Happy birthday.','Happy birthday! I wanted to give you something that isn\'t wrapped in paper. It\'s only words, but I meant every one.']},
 {id:'friendship',label:'Friendship',desc:'For the person who gets all of your jokes.',theme:'scrap',title:'For my favorite person',ph:'Hey you, I just wanted to remind you how much you mean to me…',
  s:['Hey {to}, I don\'t say it enough: having you as a friend makes life lighter. Thank you for being exactly who you are.','Remember when we thought we\'d never figure things out? We still haven\'t, but I\'m glad we\'re doing it together.','{to}, if I could pick my people all over again, I\'d pick you every time.']},
 {id:'anniversary',label:'Anniversary',desc:'Another year, another reason to say it out loud.',theme:'love',title:'Happy anniversary',ph:'From the first day to today, I keep finding new reasons…',
  s:['{to}, every year with you feels less like time passing and more like home getting bigger.','Happy anniversary. Thank you for the quiet mornings, the inside jokes, and the way you choose me on ordinary days.','I\'d happily do it all again, even the parts where we got lost. Especially those, because you were there.']},
 {id:'thanks',label:'Thank You',desc:'A proper thank you, kept somewhere nice.',theme:'garden',title:'Thank you',ph:'Thank you for the time you…',
  s:['{to}, I don\'t think you know how much it meant when you helped me. I\'m still thinking about it, and I\'m so grateful.','A small thank you for a big thing: you made a hard time easier, and I won\'t forget it.','Thank you for noticing, for showing up, and for never making me feel like a bother.']},
 {id:'congrats',label:'Congratulations',desc:'Big news deserves confetti.',theme:'confetti',title:'Congratulations',ph:'I\'m so proud of you for…',
  s:['{to}, you did it! I\'ve watched how hard you worked and I couldn\'t be prouder.','Congratulations! You earned every bit of this. I\'m cheering the loudest from wherever I am.','Big news deserves a big note: I\'m so happy for you, and I can\'t wait to hear all about it.']},
 {id:'justbecause',label:'Just Because',desc:'No reason needed. That\'s the point.',theme:'postcard',title:'Just because',ph:'No reason, really. I was thinking of you…',
  s:['No special occasion. I just thought of you and wanted you to know it made me smile.','{to}, this is a tiny reminder that you\'re loved, today and on all the days in between.','Thinking of you. That\'s the whole message, and it\'s also a lot.']},
 {id:'getwell',label:'Get Well Soon',desc:'Soft words for a slow few days.',theme:'garden',title:'Get well soon',ph:'I hope you\'re resting and being gentle with yourself…',
  s:['{to}, I hope you\'re resting and being gentle with yourself. Nothing to do but get better, and we\'ll all be here.','Sending soup, blankets, and good thoughts through the internet. Take all the time you need.','Get well soon. The world is a little quieter without you in it.']},
 {id:'longdistance',label:'Long Distance',desc:'A hug that travels across time zones.',theme:'midnight',title:'Thinking of you',ph:'Even though we\'re far apart, I want you to know…',
  s:['{to}, wherever the map says you are, you\'re still one of the closest people to me.','Same moon, different sky. I hope this feels like a hug you can keep.','The distance is real, and so is how much I miss you. Counting the days until I see you.']},
 {id:'apology',label:'Apology',desc:'Say sorry in a way that\'s kind and clear.',theme:'love',title:'I\'m sorry',ph:'I\'ve been thinking about what happened, and I\'m sorry…',
  s:['{to}, I\'ve been thinking about what happened, and I\'m sorry. I\'d like to listen and do better.','I was wrong, and I don\'t want to explain it away. You deserved better from me, and I\'m sorry.','I\'m sorry for how I made you feel. You matter more to me than being right.']},
 {id:'openwhen',label:'Open When...',desc:'Notes saved for a day they might need them.',theme:'postcard',title:'Open when…',ph:'Open when you need to remember…',
  s:['Open when you\'re having a rough day: you\'ve gotten through every hard day so far, and I\'m very proud of that.','Open when you miss me: I\'m only a message away, and I\'m thinking of you right now.','Open when you doubt yourself: look at everything you\'ve already done. That\'s the real you.']},
 {id:'other',label:'Other',desc:'Something else entirely, made your way.',theme:'love',title:'A little something',ph:'Write what you\'d like them to know…',
  s:['{to}, I wanted to make something just for you, because you\'re someone worth making things for.','A small gift of words, because sometimes that\'s the best kind.','Thinking of you, and wanting you to know it.']}
];
var OCCMAP={};OCC.forEach(function(o){OCCMAP[o.id]=o});
var THEMES=[
 {id:'love',name:'The Love Letter',desc:'Elegant paper, handwritten accents, dusty rose.'},
 {id:'scrap',name:'The Scrapbook',desc:'Layered photos, tape, stickers and doodles.'},
 {id:'garden',name:'The Little Garden',desc:'Pressed flowers, sage green, botanical details.'},
 {id:'midnight',name:'The Midnight Note',desc:'Dark plum, stars, moonlight, elegant type.'},
 {id:'postcard',name:'The Retro Postcard',desc:'Postage stamps, vintage paper, airmail edges.'},
 {id:'confetti',name:'The Birthday Confetti',desc:'Cheerful colors, balloons, playful decorations.'}
];
var THMAP={};THEMES.forEach(function(t){THMAP[t.id]=t});
var TPLS=[
 {id:'t1',name:'A Birthday Letter',occ:'birthday',theme:'love',rec:'Family',style:'Heartfelt',x:['appreciate'],s:{to:'Mum',title:'Happy birthday, Mum',from:'Priya',message:'Happy birthday, Mum.\n\nYou taught me to call when I get home and to keep a spare umbrella. I\'m still learning the rest, and I\'m glad you\'re still teaching.\n\nI hope today is gentle and loud in the best ways.',ap:['Your terrible puns','The way you save me the last piece','How you never forget to ask']}},
 {id:'t2',name:'A Best Friend Appreciation Page',occ:'friendship',theme:'scrap',rec:'Friend',style:'Playful',x:['caption','appreciate','sticker'],s:{to:'Jo',title:'Official Best Friend Appreciation',from:'Sam',message:'Dear Jo,\n\nThis page is a formal record that you are the best person to get lost with, the best at rating other people\'s playlists, and the only one who laughs at my bad jokes on purpose.\n\nThank you for all of it.',ap:['You laugh at the right moments','You answer at 2 a.m.','You never make me feel weird']}},
 {id:'t3',name:'A Digital Memory Book',occ:'other',theme:'scrap',rec:'Partner',style:'Reflective',x:['caption','note2','gallery'],s:{to:'Alex',title:'Things we\'ll remember',from:'Kai',message:'I was thinking about the small moments: the rainy bus stop, the burnt pancakes, the song we kept replaying.\n\nThey\'re not big events. They\'re the ones I\'d keep if I could only keep a few.',n2:'Add more here whenever you remember something. I\'ll add mine too.'}},
 {id:'t4',name:'A Thank You Note',occ:'thanks',theme:'garden',rec:'Family',style:'Short and sweet',x:[],s:{to:'Aunt Lena',title:'Thank you',from:'Noor',message:'Thank you for the spare room, the warm soup, and for never asking questions until I was ready to answer them.'}},
 {id:'t5',name:'A Long-Distance Hug',occ:'longdistance',theme:'midnight',rec:'Partner',style:'Heartfelt',x:['secret','sticker'],s:{to:'Mira',title:'Same moon',from:'Dev',message:'It\'s night where I am and I\'m looking at the moon, which I think is also yours.\n\nI wanted to send you something that feels like a hug. Consider this one delivered.',secret:'I\'ve already looked up flights for spring.',stk:'moon'}},
 {id:'t6',name:'An Open-When Letter Set',occ:'openwhen',theme:'postcard',rec:'Friend',style:'Reflective',x:['smile','note2'],s:{to:'Theo',title:'Open when…',from:'Rae',message:'Open when you\'re tired of being the strong one.\n\nYou don\'t have to be today. I\'ve got the snacks and the patience.',smile:'You once ate a whole birthday cake alone and called it "quality control". Never change.',n2:'Open when you can\'t sleep: think of the funniest thing that happened this week.'}},
 {id:'t7',name:'A Congratulations Card',occ:'congrats',theme:'confetti',rec:'Friend',style:'Playful',x:['sticker'],s:{to:'Ada',title:'You did it!',from:'Lou',message:'Congratulations!\n\nI watched you work on this for months, and now it\'s done. Please enjoy every second of today. I\'ll be the one cheering the loudest.',stk:'star'}},
 {id:'t8',name:'A Tiny Love Letter',occ:'anniversary',theme:'garden',rec:'Partner',style:'Short and sweet',x:['sticker'],s:{to:'Sol',title:'A tiny love letter',from:'Ren',message:'I love how you hum while you cook and pretend you aren\'t. That\'s it. That\'s the whole letter.',stk:'heart'}},
 {id:'t9',name:'A Just Because Gift',occ:'justbecause',theme:'postcard',rec:'Anyone',style:'Short and sweet',x:['sticker'],s:{to:'You',title:'Greetings from my brain',from:'Someone who thinks of you',message:'No reason. Wanted to send a little postcard from my day to yours. Hope today is kind to you.',stk:'sun'}}
];
var TPMAP={};TPLS.forEach(function(t){TPMAP[t.id]=t});
