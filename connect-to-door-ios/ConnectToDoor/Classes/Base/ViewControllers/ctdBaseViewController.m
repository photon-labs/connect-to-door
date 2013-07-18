//
//  ctdBaseViewController.m
//  ConnectToDoor
//
//  Created by aldi cita putra on 5/6/13.
//  Copyright (c) 2013 aldi cita putra. All rights reserved.
//

#import "ctdBaseViewController.h"
#import "ctdLoginViewController.h"
#import "ctdAppDelegate.h"
#import "UIViewController+MJPopupViewController.h"

@interface ctdBaseViewController ()

@end

@implementation ctdBaseViewController

@synthesize hasSignoutButton = _hasSignoutButton;

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        UIImage* image = [UIImage imageNamed:@"background_allpages.png"];
        [self.view setBackgroundColor:[UIColor colorWithPatternImage: [self imageWithImage:image scaledToSize:CGSizeMake(1024,748)]]];
        
        
        UIImage *btnImage = [UIImage imageNamed:@"button_sign-out.png"];
        signoutButton = [UIButton buttonWithType:UIButtonTypeCustom];
        [signoutButton setImage:btnImage forState:UIControlStateNormal];
        signoutButton.frame = CGRectMake(851, 624, btnImage.size.width, btnImage.size.height);
        [signoutButton addTarget:self
                   action:@selector(signOut)
         forControlEvents:UIControlEventTouchDown];
        [self.view addSubview:signoutButton];
    }
    return self;
}


- (void)signOut{
    NSLog(@"sign out button clicked");
    ctdLoginViewController *loginViewController = [[ctdLoginViewController alloc]initWithNibName:@"ctdLoginViewController" bundle:nil];
    loginViewController.hasSignoutButton = NO;
    
    ctdAppDelegate *appDelegate = [[UIApplication sharedApplication]delegate];
    [self.navigationController pushViewController:loginViewController animated:YES];
    [appDelegate.session closeAndClearTokenInformation];
}

- (UIImage *)imageWithImage:(UIImage *)image scaledToSize:(CGSize)newSize {
    //UIGraphicsBeginImageContext(newSize);
    UIGraphicsBeginImageContextWithOptions(newSize, NO, 0.0);
    [image drawInRect:CGRectMake(0, 0, newSize.width, newSize.height)];
    UIImage *newImage = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return newImage;
}

- (void)setHasSignoutButton:(BOOL)hasSignoutButton {
	_hasSignoutButton = hasSignoutButton;
	signoutButton.alpha = (_hasSignoutButton == YES) ? 1.0 :0.0;
}

-(void)viewWillAppear:(BOOL)animated{
    [self.navigationController setNavigationBarHidden:YES animated:YES];
}

- (void)viewDidLoad
{
    [super viewDidLoad];
  
    // Do any additional setup after loading the view from its nib.
}

- (void)showAlert:(typeAlert)type{
    
    alertView = [[ctdAlertViewController alloc]initViewController:type andDelegate:self];
    [self presentPopupViewController:alertView animationType:MJPopupViewAnimationFade isBackgroundClickable:NO];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

#pragma Alert View Delegate

- (void)dismissAlert{
    [self dismissPopupViewControllerWithanimationType:MJPopupViewAnimationFade];
    
    [self invalidateAlertView];
}

- (void)invalidateAlertView{
    if(alertView){
        alertView.delegate = nil;
        [alertView invalidate];
        alertView  = nil;
    }
}

@end
