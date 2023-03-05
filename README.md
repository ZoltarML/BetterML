# BetterML
  * Making A Better Manyland Experience.
  * In this documentation we'll be going through how to use BetterML as well as what each modification does individually.
  * There's quite a bit to cover so feel free to jump around to what you're needing guidance on.

## Deployment
  * These steps are hopefully temporary as the extension is currently in review by the chrome webstore.  
  * For now though, you're going to download [this](https://github.com/ZoltarML/BetterML/releases/download/1.0.0/BetterML.zip) zip file and unzip it in whichever directory you like.
  * Next you're going to want navigate to `chrome://extensions` and enable `Developer mode` in the top right hand corner of the screen.
  * Then finally click `load unpacked extension` in the top left hand corner of the screen and select the the `BetterML` folder you just unzipped.
  

## Getting Started
 * To get started using BetterML, open your settings menu and scroll to the very bottom.
 * You should see *three* new categories in your settings menu: Sound Extras, Performance, and BetterML.
 * To enable a modification simply click its toggle and enjoy!
 
![](https://gyazo.com/6dcd6b3d612b150bb8e1caf901ea7461.gif) 

# Mods
* In this section we will go over each mod and describe how to use it.

## Sound Extras
 * This modification adds a better version of mute, that mutes everything *but* claps, pings, and clicks. It also adds the ability to hear when people are typing within a small range around you as an extra option.
 
 ![](https://media.discordapp.net/attachments/856045199981281300/858919590456197130/unknown.png)
 
## Performance Settings
 * Adds five performance options to the settings menu that when toggled will suspend the listed entities drawing routine until disabled to help increase game performance.
 * Options include: Heavy Art (Most paintings and decorative block types), Dynamics, Dust, Particles, Extra Performance (Stops player from loading).
 
 ![](https://cdn.discordapp.com/attachments/614637022614782000/1081638205536862309/image.png)
 
 
## ManyBABEL
* This mod is designed to create an ingrained voice and text chat system in Manyland. 
* You can view manyBABEL's source code [here](https://github.com/ZoltarML/ManyBABEL)

### **WARNING**
 * This will *not* work unless the person you are trying to message or call also has ManyBABEL enabled.
 * If the script is not running on their end your message will be rejected and they will not be able to join world groups. 

![](https://gyazo.com/e730a6be38dd45e1297396a81992f554.gif)

### Chat Module

##### Removing Conversation
 * While hovering over a conversation a small `x` will be visible. Upon clicking it will remove a conversation and its history.
 * Note that the other clients history will still be intact.
 
![](https://gyazo.com/9f98fcf1f4104172f1b84901c395d733.gif)
 

##### Block Policy
 * If you have blocked a player normally within Manyland then you will be unable to recieve messages from that player. 
 
##### Send Message
* Upon right clicking a user a chat bubble icon will appear in their profile.
* Once clicked a message window will be opened.

![](https://gyazo.com/b9bb8bd1e0bb5b2d4c5c4cf3e7ea5e87.gif)

### Voice Module
#### Rooms[](https://emojipedia.org/house/) 🏠
 - Within the new menu item, you have the ability to make or join a **Room**.
 - A Room is a group where multiple people can speak at the same time; can only be ended by the host.
 
* **Creating a Room:**
	* When creating a room you must press the plus `(+)` icon in the upper right hand corner of the window.
	* You will then be prompted to enter a **name** and decide whether the room is **private**
		> If the room is private you will be prompted to enter a password for it.
	* Finally click **Done**, and just like that you've created a room!
			*note: if you are currently in another Room, you will be forced out of that Room and into the on you just created*
      
 ![](https://gyazo.com/a684e5c031848fe16490618f1048c3f9.gif)
			
* **Joining a Room:**
	* If you don't want to make a room, you can always **join** one.
	* Inside of the new menu item, you'll immediately see all the **Rooms** that have been created in your current world. 
	* On the right of the Room entry, you will either see a padlock or the number of people present in the Room.
		>**Padlock:** indicates that a room is private and requires a password to join
	* Upon clicking the Room, you will be either allowed in, *or* prompted for a password depending on if its private or not.
		*note: if you are in another Room when joining a different one, you will be **forced** to leave. If you are the host of said room, it well **close** the Room.*

![](https://gyazo.com/e2d75d06f5ea4e1941fe50e91ac76a04.gif)

#### Call[](https://emojipedia.org/telephone-receiver/) 📞
- This section will refer to the screen present after creating or joining a world group.
* **Callers:**
	* Upon joining/creating a Room, you will see a list of the current **Callers**
	*  In this list you can monitor who is currently speaking
		> Name will light up green when  speaking.	
	* *TODO: add mute feature and volume decrease*
	* Whenever a caller leaves, they will be removed from the **caller list**, followed by a sound. 
	* When a caller joins, their name will be added to the list, followed by the join sound.
	
* **Interface:**
	* On the bottom of the new screen you will see three buttons, **mute**, **deafen**, and **hang up**.
	* **Mute:** pressing the mute button will stop your Microphone from picking up sound.
	* **Deafen:** will stop you from hearing everyone else.
	* **Hang Up:** removes you from Room or ends Room if you are the host. 
		
![](https://gyazo.com/5bdf1f22cf0dd7f5b05e0623fd39e83a.gif)

## Item Exporter
 * Allows the user to export items by clicking the new export button that appears when right clicking an item. 
 * Do note that the items you export *must*  be created by you for the script to work

![](https://cdn.discordapp.com/attachments/858914515446136833/867257595689566218/unknown.png)
 
## Old School Rank Check
 * Shows your rank in the upper left hand corner of the screen
 * Also shows other peoples ranks when you open their profile.


 ![](https://media.discordapp.net/attachments/856045199981281300/858920442684899358/unknown.png)
 
 ![](https://cdn.discordapp.com/attachments/614637022614782000/1081639840279433246/image.png)
 
## Friends+
 * Adds new options to the friends menu. Allows you to view your blocked players, all the players in the area, and it allows you to search your friends list. It also fixes the "My People Ordered" error that will sometimes occur.
 
 ![](https://gyazo.com/3893e32d8352fd0cf18bed0c852e67fe.gif)
 
## Uncapped Placement
 * When toggled, removes the placement cap and gets rid of the "I need to rest" message. Use this mod at your own discretion, it has been seen by some as unfair and in violation of Manyland TOS.

![](https://cdn.discordapp.com/attachments/614637022614782000/1081648580621770892/image.png)
 
## Freecam
 * Allows you to freely move your came with your mouse after toggling with `ctrl+e`.
 * This mod was created by Eternity.

![](https://i.gyazo.com/9fb3d19872681fd2f1bfa8e5d83145bd.gif)

