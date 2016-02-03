set -ex
echo "Cleaning..."
rm -r out/*
echo "Running templater..."
python gen.py
echo "Copying..."
cp -R out/* ../
