DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
#echo "Directory: $DIR"
name="DBot"
if ! screen -list | grep -q $name; then
    screen -dmS $name
fi
screen -S $name -p 0 -X eval 'stuff "npm run start"\015'